from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Membaca data dari file CSV (pastikan file CSV Anda tersedia)
data = pd.read_csv('data_tpt.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/naive-bayes')
def naive_bayes():
    return render_template('naive-bayes.html')

@app.route('/svm')
def svm():
    return render_template('svm.html')

@app.route('/see-more')
def see_more():
    return render_template('see-more.html')

@app.route('/search', methods=['GET'])
def search():
    province = request.args.get('province')
    year = request.args.get('year')
    
    # Filter data berdasarkan provinsi dan tahun
    filtered_data = data[(data['Province'] == province) & (data['Year'] == int(year))]
    
    # Konversi hasil filter ke dictionary
    search_results = filtered_data.to_dict(orient='records')
    
    return render_template('search.html', province=province, year=year, results=search_results)

@app.route('/tpt')
def tpt():
    return render_template('tpt.html')

@app.route('/ump')
def ump():
    return render_template('ump.html')

@app.route('/tpak')
def tpak():
    return render_template('tpak.html')

@app.route('/aps')
def aps():
    return render_template('aps.html')

@app.route('/ppm')
def ppm():
    return render_template('ppm.html')

@app.route('/rls')
def rls():
    return render_template('rls.html')

@app.route('/tkf')
def tkf():
    return render_template('tkf.html')

@app.route('/plki')
def plki():
    return render_template('plki.html')

@app.route('/ipm')
def ipm():
    return render_template('ipm.html')

if __name__ == '__main__':
    app.run(debug=True)
