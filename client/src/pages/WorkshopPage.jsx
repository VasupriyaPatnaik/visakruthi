import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { workshopPackages } from "../data/demoData";
import { createBooking } from "../services/api";

const initialForm = {
  visitorName: "",
  email: "",
  phone: "",
  date: "",
  groupSize: 2,
  packageName: workshopPackages[0].label,
  price: workshopPackages[0].price,
  notes: ""
};

export default function WorkshopPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const updatePackage = (pkg) => {
    setForm((current) => ({
      ...current,
      packageName: pkg.label,
      price: pkg.price
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createBooking(form);
    setMessage("Workshop booking submitted. This prototype stores the request for demo analytics.");
    setForm(initialForm);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Workshop Packages"
        title="Book a craft experience with local artisans."
        description="Choose a package, submit your details, and use the prototype to demonstrate tourist and student engagement."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {workshopPackages.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => updatePackage(item)}
            className={`mesh-border card-surface rounded-[1.8rem] p-6 text-left transition ${
              form.packageName === item.label ? "ring-2 ring-terracotta" : ""
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{item.label}</p>
            <p className="mt-4 font-display text-5xl font-bold text-indigo">₹{item.price}</p>
            <p className="mt-4 text-sm leading-7 text-ink/75">{item.blurb}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mesh-border card-surface mt-12 rounded-4xl p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <input
            required
            value={form.visitorName}
            onChange={(event) => setForm({ ...form, visitorName: event.target.value })}
            placeholder="Name"
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Email"
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="Phone"
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="number"
            min="1"
            value={form.groupSize}
            onChange={(event) => setForm({ ...form, groupSize: Number(event.target.value) })}
            placeholder="Group Size"
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input value={`${form.packageName} - ₹${form.price}`} readOnly className="rounded-2xl border border-indigo/10 bg-sand px-4 py-4 outline-none" />
        </div>
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          placeholder="Special requests"
          rows="4"
          className="mt-5 w-full rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
        />
        <button type="submit" className="mt-6 rounded-full bg-indigo px-6 py-3 text-sm font-bold text-sand transition hover:bg-terracotta">
          Submit Booking
        </button>
        {message ? <p className="mt-4 text-sm font-semibold text-terracotta">{message}</p> : null}
      </form>
    </div>
  );
}
