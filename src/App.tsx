import React, { useMemo, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, MapPin, Phone, Clock } from "lucide-react";

const comboList = [
  [1, "Chicken Teriyaki", "$10.15"],
  [2, "Chicken Beef Teriyaki", "$13.15"],
  [3, "Chicken Shrimp Teriyaki", "$13.10"],
  [4, "Chicken Beef Shrimp Teriyaki", "$16.25"],
  [5, "Beef Teriyaki", "$11.15"],
  [6, "Beef Shrimp Teriyaki", "$13.55"],
  [7, "Shrimp Teriyaki", "$11.55"],
  [8, "Tilapia Teriyaki", "$11.25"],
  [9, "Salmon Teriyaki", "$13.25"],
  [10, "Scallops Teriyaki", "$14.25"],
  [11, "Scallops and Shrimp Teriyaki", "$18.20"],
  [12, "Scallops and Chicken Teriyaki", "$17.20"],
  [13, "Chicken, Shrimp and Scallops Teriyaki", "$20.25"],
  [14, "Chicken, Beef, Shrimp and Scallops Teriyaki", "$24.05"],
];

const vegetarianMeals = [
  ["Vegetarian Noodles", "$6.59"],
  ["Vegetarian Rice", "$5.99"],
];

const vegetarianNotes = [
  ["Replace Rice for Noodles", "$1.29"],
  ["Extra Rice", "$1.29"],
  ["Extra Vegetables", "$1.54"],
];

const sideList = [
  ["White Rice", "$2.75"],
  ["Fried Rice", "$3.75"],
  ["Spring Roll (1)", "$1.99"],
  ["Dumplings", "$5.00"],
  ["White Sauce", "$0.80"],
  ["Side of Noodles", "$4.25"],
  ["Side of Vegetables", "$4.00"],
  ["Shrimp Tempura", "$4.95"],
  ["Chicken Egg Roll", "$2.99"],
  ["Shrimp Egg Roll", "$3.99"],
  ["Cheesesteak Egg Roll", "$3.99"],
];

const beverageList = [
  ["Bottled Drink", "$2.85"],
  ["Canned Drink", "$2.35"],
  ["Fountain Drink", "$2.85"],
  ["Energy Drink", "$4.25"],
  ["Bottled Water", "$1.65"],
  ["Glass Drink", "$3.39"],
];

function MenuSearch({ query, setQuery }: any) {
  return (
    <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
        Search Menu
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search entrees, vegetarian, sides, drinks..."
        className="mt-3 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-red-500"
      />
    </div>
  );
}

function MenuSection({ title, items, numbered = false }: any) {
  return (
    <section className="rounded-[24px] border border-red-100 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-black uppercase text-stone-900">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item: any) => (
          <div
            key={`${title}-${item[0]}`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-stone-100 bg-[#fffdfa] px-4 py-4"
          >
            <div className="min-w-0">
              <div className="font-semibold text-stone-900">
                {numbered ? item[1] : item[0]}
              </div>
              {numbered && (
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                  #{item[0]}
                </div>
              )}
            </div>
            <div className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
              {numbered ? item[2] : item[1]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [hoursOpen, setHoursOpen] = useState(false);

  const filterPlain = (items: any[]) => {
    if (!query.trim()) return items;
    return items.filter((item) =>
      `${item[0]} ${item[1]}`.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredCombos = useMemo(() => {
    if (!query.trim()) return comboList;
    return comboList.filter((item) =>
      `${item[0]} ${item[1]} ${item[2]}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  const filteredVegetarianMeals = useMemo(
    () => filterPlain(vegetarianMeals),
    [query]
  );
  const filteredVegetarianNotes = useMemo(
    () => filterPlain(vegetarianNotes),
    [query]
  );
  const filteredSides = useMemo(() => filterPlain(sideList), [query]);
  const filteredBeverages = useMemo(() => filterPlain(beverageList), [query]);

  return (
    <div className="min-h-screen bg-[#fffaf6] text-stone-900">
      <div className="flex min-h-screen">
        <aside
          className={`fixed left-0 top-0 z-40 h-full w-[250px] border-r border-red-950/10 bg-black text-white transition-transform duration-300 md:w-[290px] md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end border-b border-white/10 px-4 py-3 md:px-5">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 py-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-base font-bold hover:bg-white/10"
            >
              <span>Menu</span>
              {menuOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {menuOpen && (
              <div className="mt-2 space-y-2 pl-4 text-sm text-white/80">
                <a
                  href="#entrees"
                  onClick={() => setSidebarOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  Entrees
                </a>
                <a
                  href="#vegetarian"
                  onClick={() => setSidebarOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  Vegetarian Meals
                </a>
                <a
                  href="#sides"
                  onClick={() => setSidebarOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  Sides & Extras
                </a>
                <a
                  href="#beverages"
                  onClick={() => setSidebarOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  Beverages
                </a>
              </div>
            )}

            <button
              onClick={() => setHoursOpen(!hoursOpen)}
              className="mt-3 flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-base font-bold hover:bg-white/10"
            >
              <span>Hours</span>
              {hoursOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {hoursOpen && (
              <div className="mt-2 space-y-2 pl-4 text-sm text-white/80">
                <a
                  href="#hours"
                  onClick={() => setSidebarOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  Store Hours
                </a>
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1 md:ml-[290px]">
          <header className="sticky top-0 z-30 border-b border-red-950/10 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <button
                className="rounded-xl border border-stone-200 p-2 md:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <div className="text-xl font-black uppercase text-stone-900 md:text-2xl">
                  The Teriyaki Plate
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-red-600 md:text-sm">
                  Express Grilled Cuisine
                </div>
              </div>
            </div>
          </header>

          <main>
            <section className="bg-[linear-gradient(135deg,#090909,#420707_55%,#161616)] px-4 py-12 text-white md:px-8 md:py-16">
              <div className="mx-auto max-w-6xl">
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-200">
                  Wilmington, North Carolina
                </div>

              <div className="mt-6 flex justify-center">
  <img
    src="data:image/jpeg;base64,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"
    alt="The Teriyaki Plate Logo"
    className="w-full max-w-[900px] rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl"
  />
</div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-red-300" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                          Address
                        </div>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=1414+S+College+Rd+Wilmington+NC+28403"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 block text-lg font-semibold hover:text-red-200"
                        >
                          1414 S College Rd
                        </a>
                        <div className="text-white/80">Wilmington, NC 28403</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 text-red-300" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                          Phone
                        </div>
                        <div className="mt-2 text-lg font-semibold">
                          (910) 399-5592
                        </div>
                        <div className="text-white/80">Call ahead for pickup</div>
                        <a
                          href="tel:19103995592"
                          className="mt-4 inline-block rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
                        >
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-4 py-10 md:px-8">
              <div className="mx-auto max-w-6xl">
                <MenuSearch query={query} setQuery={setQuery} />
              </div>
            </section>

            <section id="entrees" className="px-4 pb-10 md:px-8">
              <div className="mx-auto max-w-6xl">
                <MenuSection title="Entrees" items={filteredCombos} numbered={true} />
                <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-stone-700">
                  Combos are served with fried or white rice and vegetables.
                  Substitute or add noodles for $1.29.
                </div>
              </div>
            </section>

            <section id="vegetarian" className="px-4 pb-10 md:px-8">
              <div className="mx-auto max-w-6xl space-y-4">
                <MenuSection
                  title="Vegetarian Meals"
                  items={filteredVegetarianMeals}
                />
                <div className="rounded-[24px] border border-red-100 bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-black uppercase text-stone-900">
                    Vegetarian Add Ons
                  </h3>
                  <div className="mt-5 grid gap-3">
                    {filteredVegetarianNotes.map((item) => (
                      <div
                        key={`veg-note-${item[0]}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-stone-100 bg-[#fffdfa] px-4 py-4"
                      >
                        <div className="font-semibold text-stone-900">
                          {item[0]}
                        </div>
                        <div className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                          {item[1]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="sides" className="px-4 pb-10 md:px-8">
              <div className="mx-auto max-w-6xl">
                <MenuSection title="Sides & Extras" items={filteredSides} />
              </div>
            </section>

            <section id="beverages" className="px-4 pb-10 md:px-8">
              <div className="mx-auto max-w-6xl">
                <MenuSection title="Beverages" items={filteredBeverages} />
              </div>
            </section>

            <section id="hours" className="px-4 pb-16 md:px-8">
              <div className="mx-auto max-w-6xl rounded-[24px] border border-red-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <h2 className="text-2xl font-black uppercase text-stone-900">
                    Hours
                  </h2>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-stone-100 bg-[#fffdfa] p-5">
                    <div className="font-semibold text-stone-900">
                      Sunday – Thursday
                    </div>
                    <div className="mt-2 text-stone-600">
                      10:30 AM – 7:30 PM
                    </div>
                  </div>
                  <div className="rounded-2xl border border-stone-100 bg-[#fffdfa] p-5">
                    <div className="font-semibold text-stone-900">
                      Friday – Saturday
                    </div>
                    <div className="mt-2 text-stone-600">
                      10:30 AM – 8:30 PM
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="px-4 pb-8 pt-2 text-center text-sm text-stone-500 md:px-8">
            © The Teriyaki Plate – Wilmington, NC
          </footer>
        </div>
      </div>
    </div>
  );
}
