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

export default function Faq() {
  const [search, setSearch] = useState("");

  const filteredSections = faqSections
    .map((section) => {
      const filteredItems = section.items.filter((item) => {
        const text = `${item.question} ${item.answer}`.toLowerCase();
        return text.includes(search.toLowerCase());
      });

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter((section) => section.items.length > 0);

  return (
    <section className="w-full py-8 bg-background-default">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="mb-4 text-center text-heading1 text-texto-principal">
          Preguntas Frecuentes
        </h1>

        {/* 🔍 Buscador */}
        <div className="mb-6">
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
          />
        </div>

        <div className="flex flex-col gap-6">
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
                      "&:before": {
                        display: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        minHeight: "52px",
                        px: 0,
                        "& .MuiAccordionSummary-content": {
                          margin: "12px 0",
                        },
                      }}
                    >
                      <span className="text-body text-texto-principal">
                        {item.question}
                      </span>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        px: 0,
                        pb: 2,
                      }}
                    >
                      <p className="text-smart-mobile text-texto-secundario">
                        {item.answer}
                      </p>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}