<html>

<head>
    <style>
        body {
            font-family: sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #16a34a;
            color: white;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .stok-rendah {
            color: red;
            font-weight: bold;
        }


        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            background: #e1f5fe;
            color: #01579b;
        }
    </style>
</head>

<body>
    <div class="header">
        <h2>LAPORAN STOK BENIH GREENSEED</h2>
        <p>Tanggal Cetak: {{ date('d F Y') }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $p)
                <tr>
                    <td>{{ $p->name }}</td>
                    <td>{{ $p->category->name ?? 'Umum' }}</td>
                    <td>Rp {{ number_format($p->price, 0, ',', '.') }}</td>
                    <td class="{{ $p->stock < 10 ? 'stok-rendah' : '' }}">{{ $p->stock }} PCS</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
