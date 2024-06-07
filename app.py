import streamlit as st
import pandas as pd

# Load data CSV
@st.cache
def load_data():
    return pd.read_csv('data_prediksi_kedua_model.csv')

data = load_data()

# Menampilkan form input
st.title('Pencarian Prediksi Kedua Model')
province = st.text_input('Masukkan Provinsi:')
year = st.text_input('Masukkan Tahun:')

# Proses pencarian
if st.button('Cari'):
    results = data[(data['Provinsi'].str.upper() == province.upper()) & (data['Tahun'] == int(year))]
    st.write(results)
