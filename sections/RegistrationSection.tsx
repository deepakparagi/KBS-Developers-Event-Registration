"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FormField } from "@/components/FormField";
import { GlassPanel } from "@/components/GlassPanel";
import { GoldButton } from "@/components/GoldButton";
import {
  type RegistrationFormErrors,
  type RegistrationFormValues,
  validateRegistrationForm
} from "@/utils/validation";

const initialValues: RegistrationFormValues = {
  fullName: "",
  phone: "",
  email: "",
  adults: "1",
  children: "0"
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export function RegistrationSection(): JSX.Element {
  const [values, setValues] = useState<RegistrationFormValues>(initialValues);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Hover / Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x * -20); // Move opposite to mouse
    mouseY.set(y * -20);
  };

  const handleFieldChange = (field: keyof RegistrationFormValues, value: string): void => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const nextErrors = validateRegistrationForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        fullName: values.fullName.trim(),
        contactNumber: values.phone.trim(),
        emailAddress: values.email.trim().toLowerCase(),
        numberOfAdults: parseInt(values.adults, 10),
        numberOfKids: parseInt(values.children, 10)
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setSubmitError(data.message ?? data.error ?? "Unable to save your invitation. Please try again.");
        return;
      }

      setSubmitted(true);
      setValues(initialValues);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="registration"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pb-20 pt-12 md:pb-24 md:pt-16 bg-[#05080c]"
    >
      {/* Villa Photography Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 origin-center"
        style={{ x: smoothMouseX, y: smoothMouseY, scale: 1.05 }}
      >
        <Image
          src="/villa-bg.jpg"
          alt="Luxury modern villa exterior at dusk"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-[#05080c]/80 to-[#05080c]/30" />
      </motion.div>
      <div className="section-shell relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-lg"
        >
          <GlassPanel className="w-full px-4 py-8 md:px-8 md:py-12">
            <motion.div variants={itemVariants} className="mb-6 text-center md:mb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                Private Registration
              </p>
              <h2 className="mt-3 font-heading text-2xl leading-tight md:mt-4 md:text-4xl lg:text-5xl">
                Reserve Your Presence
              </h2>
            </motion.div>

            <form
              className="flex flex-col gap-5 md:gap-6"
              noValidate
              onSubmit={handleSubmit}
            >
              <motion.div variants={itemVariants}>
                <FormField
                  id="fullName"
                  label="Full Name"
                  value={values.fullName}
                  onChange={(v) => handleFieldChange("fullName", v)}
                  placeholder="Your name"
                  required
                  error={errors.fullName}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormField
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={values.phone}
                  onChange={(v) => handleFieldChange("phone", v)}
                  placeholder="+91 98765 43210"
                  required
                  error={errors.phone}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={(v) => handleFieldChange("email", v)}
                  placeholder="name@example.com"
                  required
                  error={errors.email}
                />
              </motion.div>
              <motion.div variants={itemVariants} className="grid gap-5 md:grid-cols-2 md:gap-6">
                <FormField
                  id="adults"
                  label="Adults"
                  type="number"
                  min={1}
                  max={12}
                  value={values.adults}
                  onChange={(v) => handleFieldChange("adults", v)}
                  required
                  error={errors.adults}
                />
                <FormField
                  id="children"
                  label="Children"
                  type="number"
                  min={0}
                  max={12}
                  value={values.children}
                  onChange={(v) => handleFieldChange("children", v)}
                  required
                  error={errors.children}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4 md:pt-6 flex justify-center w-full">
                <GoldButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Reserve Your Invitation"}
                </GoldButton>
              </motion.div>
            </form>

            <motion.p
              variants={itemVariants}
              className={`mt-4 min-h-5 text-center text-sm tracking-[0.03em] ${submitError ? "text-amber-300/90" : submitted ? "text-gold" : "text-text-muted"
                }`}
            >
              {submitError ??
                (submitted
                  ? "Your invitation request has been received. Our concierge team will contact you shortly."
                  : "All entries are private and reviewed by invitation desk.")}
            </motion.p>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
