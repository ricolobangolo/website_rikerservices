from flask_frozen import Freezer

app = Flask(__name__)
freezer = Freezer(app)

@app.route('/')
def index():
    return send_from_directory('html', 'index.html')

@app.route('/<path:filename>')
def serve_html(filename):
    if filename.endswith('.html'):
        try:
            return send_from_directory('html', filename)
        except FileNotFoundError:
            abort(404)
    return abort(404)

@app.route('/css/<path:filename>')
def serve_css(filename):
    try:
        return send_from_directory('css', filename, mimetype='text/css')
    except FileNotFoundError:
        abort(404)

@app.route('/js/<path:filename>')
def serve_js(filename):
    try:
        return send_from_directory('js', filename, mimetype='application/javascript')
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    freezer.freeze()