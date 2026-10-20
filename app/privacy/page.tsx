export const metadata = {
  title: "Kebijakan Privasi: OmniDevv Social",
  description:
    "Kebijakan privasi aplikasi Meta OmniDevv Social: alat otomasi konten pribadi satu pengguna untuk mempublish tutorial pemrograman ke @omnidevv.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    n: "1",
    t: "Data yang kami kumpulkan",
    body: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Identitas akun Instagram Bisnis</strong> milik operator sendiri (ID akun,
          username <code>@omnidevv</code>), dipakai untuk memastikan publish menarget akun
          yang benar.
        </li>
        <li>
          <strong>Metadata media yang dipublish</strong> (ID media, permalink, timestamp),
          dibaca kembali setelah publish untuk memastikan postingan terbit dan dicatat di
          ledger lokal.
        </li>
        <li>
          <strong>Access token Meta</strong> (user access token berumur panjang), disimpan{" "}
          <em>hanya</em> di brankas kredensial lokal milik operator dan tidak pernah
          dibagikan, ditampilkan, atau dikirim ke pihak mana pun selain Meta Graph API.
        </li>
      </ul>
    ),
  },
  {
    n: "2",
    t: "Data yang TIDAK kami kumpulkan",
    body: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Kami <strong>tidak</strong> mengakses, menyimpan, atau memproses data milik pengguna
          Instagram/Facebook lain dalam bentuk apa pun.
        </li>
        <li>
          Kami <strong>tidak</strong> mengumpulkan data lokasi, kontak, pesan, atau data
          perangkat.
        </li>
        <li>
          Kami <strong>tidak</strong> menggunakan cookie, pelacak iklan, atau analytics pihak
          ketiga.
        </li>
      </ul>
    ),
  },
  {
    n: "3",
    t: "Tujuan penggunaan data",
    body: (
      <p>
        Seluruh data di atas dipakai semata-mata untuk satu tujuan: mempublish konten
        edukatif orisinal milik operator ke akun Instagram Bisnis miliknya sendiri, serta
        mencatat riwayat publish tersebut di sistem lokal operator. Tidak ada tujuan lain.
      </p>
    ),
  },
  {
    n: "4",
    t: "Berbagi data dengan pihak ketiga",
    body: (
      <p>
        Data hanya dikirim ke <strong>Meta Platforms</strong> (melalui Graph API resmi di{" "}
        <code>graph.facebook.com</code>) sejauh diperlukan untuk fungsi publish dan pembacaan
        status media. Kami tidak menjual, menyewakan, atau membagikan data kepada pihak
        ketiga mana pun.
      </p>
    ),
  },
  {
    n: "5",
    t: "Penyimpanan dan keamanan",
    body: (
      <p>
        Data disimpan di infrastruktur pribadi operator (server lokal/VM). Access token
        disimpan terenkripsi di brankas kredensial lokal dan tidak pernah ditulis ke file
        log, repositori kode, atau pesan chat. Metadata publish (ID media, tanggal) disimpan
        tanpa batas waktu sebagai arsip riwayat konten milik operator sendiri.
      </p>
    ),
  },
  {
    n: "6",
    t: "Hak Anda",
    body: (
      <p>
        Karena aplikasi ini hanya memproses akun milik operator sendiri dan tidak memproses
        data pihak ketiga, tidak ada data pribadi pihak ketiga yang tersimpan di sistem
        kami. Jika Anda meyakini sebaliknya, hubungi kami di bawah dan kami akan
        menindaklanjutinya.
      </p>
    ),
  },
  {
    n: "7",
    t: "Kontak",
    body: (
      <p>
        Pertanyaan soal kebijakan ini:{" "}
        <a
          href="mailto:support@omnidevv.biz.id"
          className="text-violet-600 dark:text-violet-400 underline"
        >
          support@omnidevv.biz.id
        </a>
        <br />
        Situs:{" "}
        <a
          href="https://www.omnidevv.biz.id"
          className="text-violet-600 dark:text-violet-400 underline"
        >
          www.omnidevv.biz.id
        </a>
      </p>
    ),
  },
  {
    n: "8",
    t: "Perubahan kebijakan",
    body: (
      <p>
        Setiap perubahan akan tercermin pada tanggal &ldquo;Terakhir diperbarui&rdquo; di
        atas. Karena aplikasi ini dipakai satu pengguna (operator sendiri), perubahan
        material akan dicatat di repositori internal operator.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400">
        OmniDevv Social · App ID 900192013046788
      </p>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
        Kebijakan Privasi
      </h1>
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        Terakhir diperbarui: 13 Oktober 2026 · Operator: OmniDevv (Indonesia)
      </p>

      <p className="mt-8 leading-7 text-neutral-700 dark:text-neutral-300">
        <strong>OmniDevv Social</strong> adalah aplikasi otomasi konten pribadi yang dibuat
        dan dioperasikan oleh <strong>OmniDevv</strong> untuk satu pengguna saja, yaitu
        developer-nya sendiri. Aplikasi ini mempublish konten edukatif orisinal (tutorial
        pemrograman) ke akun Instagram Bisnis milik operator sendiri (
        <strong>@omnidevv</strong>) melalui Meta Graph API. Tidak ada pengguna lain, tidak
        ada pendaftaran akun, dan aplikasi ini tidak ditawarkan ke publik.
      </p>

      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.n}>
            <h2 className="text-lg font-semibold text-violet-700 dark:text-violet-300">
              {s.n}. {s.t}
            </h2>
            <div className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">
              {s.body}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        © 2026 OmniDevv · Kebijakan ini berlaku untuk aplikasi Meta &ldquo;OmniDevv
        Social&rdquo; (App ID 900192013046788).
      </footer>
    </main>
  );
}
