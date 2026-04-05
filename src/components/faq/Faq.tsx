"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  InputAdornment,
} from "@mui/material";
import { faqSections } from "./faq.data";

// 🔥 helper para negritas y saltos de línea
const formatText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
};

export default function Faq() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState(faqSections[0]?.title);

  const filteredSections = faqSections
    .map((section) => {
      const filteredItems = section.items.filter((item) => {
        const text = `${section.title} ${item.question} ${item.answer}`.toLowerCase();
        return text.includes(search.toLowerCase());
      });

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter((section) => section.items.length > 0);

  const desktopSections = search
    ? filteredSections
    : faqSections.filter((section) => section.title === activeSection);

  return (
    <section className="w-full py-8 bg-background-default lg:py-12">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-0">
        
        {/* Título */}
        <h1 className="mb-4 text-center text-heading1 text-texto-principal lg:text-display">
          Preguntas Frecuentes
        </h1>

        {/* 🔍 Buscador */}
        <div className="flex justify-center mb-6 lg:mb-10">
          <div className="w-full lg:max-w-[600px]">
            <TextField
              fullWidth
              placeholder="Buscá tu consulta"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FAF9F7",
                  borderRadius: "12px",
                },
              }}
            />
          </div>
        </div>

        {/* 📱 MOBILE */}
        <div className="flex flex-col gap-6 lg:hidden">
          {filteredSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h2 className="w-full pb-2 font-bold text-body text-texto-principal">
                {section.title}
              </h2>

              <div className="flex flex-col gap-2 p-4 bg-background-secondary">
                {section.items.map((item) => (
                  <Accordion
                    key={item.question}
                    disableGutters
                    elevation={0}
                    square
                    sx={{
                      backgroundColor: "transparent",
                      borderBottom: "1px solid #E5DDCF",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <span className="text-body text-texto-principal">
                        {item.question}
                      </span>
                    </AccordionSummary>

                    <AccordionDetails>
                      <p
                        className="text-smart-mobile text-texto-secundario"
                        dangerouslySetInnerHTML={{
                          __html: formatText(item.answer),
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP */}
        <div className="hidden lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          
          {/* Sidebar */}
          <aside className="sticky p-4 top-24 h-fit rounded-2xl bg-background-secondary">
            <div className="flex flex-col gap-1">
              {faqSections.map((section) => (
                <button
                  key={section.title}
                  onClick={() => setActiveSection(section.title)}
                  className={`rounded-xl px-4 py-3 text-left text-body transition ${
                    activeSection === section.title && !search
                      ? "bg-background-default font-bold text-texto-principal"
                      : "text-texto-secundario hover:bg-background-default/70"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Contenido */}
          <div className="flex flex-col gap-6">
            {desktopSections.map((section) => (
              <div key={section.title} className="flex flex-col">
                
                {/* Solo aparece si hay búsqueda */}
                {search && (
                  <h2 className="mb-4 font-bold text-heading1 text-texto-principal">
                    {section.title}
                  </h2>
                )}

                <div className="flex flex-col gap-0 p-6 rounded-2xl bg-background-secondary">
                  {section.items.map((item) => (
                    <Accordion
                      key={item.question}
                      disableGutters
                      elevation={0}
                      square
                      sx={{
                        backgroundColor: "transparent",
                        borderBottom: "1px solid #E5DDCF",
                        "&:before": { display: "none" },
                        "&:last-of-type": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <span className="text-body text-texto-principal">
                          {item.question}
                        </span>
                      </AccordionSummary>

                      <AccordionDetails>
                        <p
                          className="text-body text-texto-secundario"
                          dangerouslySetInnerHTML={{
                            __html: formatText(item.answer),
                          }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}