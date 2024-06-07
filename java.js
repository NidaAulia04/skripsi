// Load data from CSV file
function loadData(callback) {
    Papa.parse("data_prediksi_kedua_model.csv", {
        download: true,
        header: true,
        complete: function(results) {
            callback(results.data);
        },
        error: function(err) {
            console.error("Error loading CSV file: ", err);
        }
    });
}

// Perform search based on province name and year
function search(provinceInput, yearInput) {
    var searchResults = document.getElementById("searchResults");
    var tableCaption = document.getElementById("tableCaption"); // Elemen untuk keterangan
    searchResults.innerHTML = "";
    tableCaption.innerHTML = ""; // Reset keterangan

    loadData(function(data) {
        if (data.length === 0) {
            searchResults.innerHTML = "No data found in CSV.";
            return;
        }

        var results = data.filter(function(row) {
            return row.Provinsi.toUpperCase().includes(provinceInput.toUpperCase()) && row.Tahun === yearInput;
        });

        if (results.length > 0) {
            var table = "<table><tr><th>Provinsi</th><th>Tahun</th><th>APS</th><th>PPM</th><th>RLS</th><th>IPM</th><th>TKF</th><th>PLKI</th><th>TPAK</th><th>UMP</th><th>TPT Actual</th><th>TPT NBC</th><th>TPT SVM</th></tr>";
            results.forEach(function(row) {
                table += "<tr>";
                table += "<td>" + row.Provinsi + "</td>";
                table += "<td>" + row.Tahun + "</td>";
                table += "<td>" + row.APS + "</td>";
                table += "<td>" + row.PPM + "</td>";
                table += "<td>" + row.RLS + "</td>";
                table += "<td>" + row.IPM + "</td>";
                table += "<td>" + row.TKF + "</td>";
                table += "<td>" + row.PLKI + "</td>";
                table += "<td>" + row.TPAK + "</td>";
                table += "<td>" + row.UMP + "</td>";
                table += "<td>" + row['TPT Actual'] + "</td>";
                table += "<td>" + row['TPT NBC'] + "</td>";
                table += "<td>" + row['TPT SVM'] + "</td>";
                table += "</tr>";
            });
            table += "</table>";
            searchResults.innerHTML = table;
            tableCaption.innerHTML = "Data di atas merupakan hasil klasifikasi Tingkat Pengangguran Terbuka (TPT) berdasarkan model Naïve Bayes dan Support Vector Machine untuk provinsi dan tahun yang dipilih.<br>";
            tableCaption.innerHTML += "<strong>Keterangan:<br>";
            tableCaption.innerHTML += "APS : Angka Partisipasi Sekolah<br>";
            tableCaption.innerHTML += "PPM : Persentase Penduduk Miskin<br>";
            tableCaption.innerHTML += "RLS : Rata-Rata Lama Sekolah<br>";
            tableCaption.innerHTML += "IPM : Indeks Pembangunan Manusia<br>";
            tableCaption.innerHTML += "TKF : Tenaga Kerja Formal<br>";
            tableCaption.innerHTML += "PLKI : Proporsi Lapangan Kerja Informal<br>";
            tableCaption.innerHTML += "TPAK : Tingkat Partisipasi Angkatan Kerja<br>";
            tableCaption.innerHTML += "UMP : Upah Minimum Provinsi<br>";
            tableCaption.innerHTML += "TPT : Tingkat Pengangguran Terbuka<br>";
            tableCaption.innerHTML += "NBC : Naïve Bayes Classifier<br>";
            tableCaption.innerHTML += "SVM : Support Vector Machine";
        } else {
            searchResults.innerHTML = "No results found.";
            tableCaption.innerHTML = ""; // Reset keterangan jika tidak ada hasil
        }
    });
}