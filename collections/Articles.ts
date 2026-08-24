import type { CollectionConfig } from 'payload'

/**
 * Editorial surface behind /underlag.
 *
 * `kind` discriminates the two planned surfaces. Only `underlag` renders
 * today; `omvarld` (dated omvärldsbevakning) is declared up front so adding
 * it later is a content decision rather than a Postgres migration.
 */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** å/ä/ö → a/a/o, then strip to lowercase kebab. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/å|ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/é/g, 'e')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Underlag', plural: 'Underlag' },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    description:
      'Redaktionellt underlag. Publicerade sidor når /underlag — utkast syns bara här.',
    group: 'Innehåll',
  },

  // Draft/publish. Writing happens in the open without anything reaching
  // the public surface until someone presses Publish.
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },

  access: {
    /**
     * The Payload REST API is mounted at /api/[...slug], so this collection is
     * reachable at /api/articles by anyone. Without this rule the default is
     * world-readable and unpublished drafts leak. Anonymous callers get
     * published documents only; logged-in editors get everything.
     */
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.title === 'string' && data.title) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Rubrik',
      admin: {
        description:
          'Sätts som <h1> och som <title>. Meningsform — inga VERSALER. Ett kursiverat ord får emfas i mallen.',
      },
    },
    {
      name: 'dek',
      type: 'textarea',
      required: true,
      maxLength: 260,
      label: 'Ingress',
      admin: {
        description:
          'Två till tre meningar. Används som ingress, i listan på /underlag och som meta description när ingen egen är satt.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Brödtext',
    },

    // ---- sidebar -------------------------------------------------------
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL-slug',
      admin: {
        position: 'sidebar',
        description: 'Blir /underlag/<slug>. Ändra aldrig på en publicerad sida utan omdirigering.',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !SLUG_PATTERN.test(value)) {
          return 'Endast gemener, siffror och bindestreck. Exempel: ivo-tillsyn-forberedelse'
        }
        return true
      },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'underlag',
      label: 'Typ',
      admin: {
        position: 'sidebar',
        description: 'Omvärld är förberett men har ingen publik yta ännu.',
      },
      options: [
        { label: 'Underlag (beständigt)', value: 'underlag' },
        { label: 'Omvärld (daterat)', value: 'omvarld' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategori',
      admin: { position: 'sidebar', description: 'Visas som etikett över rubriken.' },
      options: [
        { label: 'Regelverk', value: 'regelverk' },
        { label: 'Ersättning', value: 'ersattning' },
        { label: 'Schemaläggning', value: 'schemalaggning' },
        { label: 'Dokumentation', value: 'dokumentation' },
        { label: 'Systembyte', value: 'systembyte' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Publicerad',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Författare',
      admin: {
        position: 'sidebar',
        description: 'Faller tillbaka på Elivro-redaktionen om tom.',
      },
    },

    // ---- SEO -----------------------------------------------------------
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta-titel',
          admin: { description: 'Valfri. Faller tillbaka på rubriken. Sikta på under 60 tecken.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 200,
          label: 'Meta-beskrivning',
          admin: { description: 'Valfri. Faller tillbaka på ingressen. Sikta på 140–160 tecken.' },
        },
        {
          name: 'noindex',
          type: 'checkbox',
          defaultValue: false,
          label: 'Blockera indexering',
          admin: {
            description:
              'Sätter noindex och håller sidan utanför sitemap. För sidor som publiceras men inte ska sökas upp ännu.',
          },
        },
      ],
    },
  ],
}
