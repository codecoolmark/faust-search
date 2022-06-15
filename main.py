from flask import Flask, render_template, request

import data.manager as manager

app = Flask(__name__)


@app.route('/')
def index():
    if 'searchTerm' in request.args and request.args['searchTerm'].strip() != '':
        search_term = request.args['searchTerm']
        search_results = manager.search_paragraphs(search_term)
        return render_template('index.html', search_term=search_term, search_results=search_results)
    else:
        return render_template('index.html')


@app.route('/api/search')
def search():
    search_term = request.args['searchTerm']
    search_results = manager.search_paragraphs(search_term)
    return {'searchResults': search_results}


@app.route('/faust/part-one')
def faust_part_one():
    paragraphs = manager.get_faust_first_part_paragraphs()
    return render_template('text.html', title='Der Tragödie erster Teil', paragraphs=paragraphs)


@app.route('/faust/part-two')
def faust_part_two():
    paragraphs = manager.get_faust_second_part_paragraphs()
    return render_template('text.html', title='Der Tragödie zweiter Teil', paragraphs=paragraphs)


if __name__ == '__main__':
    app.run()
