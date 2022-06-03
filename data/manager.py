def get_faust_paragraphs():
    return get_faust_first_part_paragraphs() + get_faust_second_part_paragraphs()


def get_faust_first_part_paragraphs():
    with open('data/Der Tragödie erster Teil.txt') as file:
        return file.read().rsplit('\n\n')


def get_faust_second_part_paragraphs():
    with open('data/Der Tragödie zweiter Teil.txt') as file:
        return file.read().rsplit('\n\n')

def search_paragraphs(search_term):
    return [paragraph for paragraph in get_faust_paragraphs() if search_term.casefold() in paragraph.casefold()]
