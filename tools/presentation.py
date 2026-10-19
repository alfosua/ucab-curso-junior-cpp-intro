"""Mantiene cada ejemplo completo junto a su explicación."""


def prepare_project_chapters(chapters):
    for chapter in chapters:
        for topic in chapter['topics']:
            slides = []
            for original in topic['slides']:
                item = dict(original)
                if item.get('code') or item.get('terminal') or item.get('multiFile'):
                    item['layout'] = 'code'
                if item.get('code'):
                    # Identifica el bloque publicado para la reconstrucción del
                    # proyecto; ya no se divide en partes ni en slides adicionales.
                    item.update(codeGroup=item['title'], codePart=1, codeParts=1)
                if item.get('multiFile'):
                    item['content'] = item['content'] + [
                        "Consulta cada archivo en su pestaña. Si es largo, desplázate dentro del código; Copiar conserva el archivo completo."
                    ]
                if item.get('contact') and item['title'] != 'Código y contacto':
                    slides.append({k: v for k, v in item.items() if k not in ('contact', 'downloadCard')})
                    slides.append(dict(title='Código y contacto', content=[],
                                       contact=item['contact'], downloadCard=item['downloadCard']))
                else:
                    slides.append(item)
            topic['slides'] = slides
    return chapters
