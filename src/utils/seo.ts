export const seo = ({
  title,
  description,
  keywords,
}: {
  title: string
  description?: string
  keywords?: string
}) => {
  return [
    { title },
    { name: 'description', content: description || 'Nurture - 7-Day Collaborative Multimedia Study Hub' },
    { name: 'keywords', content: keywords || 'nurture, church, sprint, reflection, scripture, devotion' },
  ]
}

