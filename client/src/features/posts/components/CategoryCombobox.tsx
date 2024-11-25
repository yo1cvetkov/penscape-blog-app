import React, { SetStateAction, useState } from "react";
import { Category } from "../../categories/types/Category";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Description, Field } from "@headlessui/react";
import FormLabel from "../../../components/ui/FormLabel";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface CategoryComboboxProps {
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<SetStateAction<Category | null>>;
}

function CategoryCombobox({ categories, selectedCategory, setSelectedCategory }: CategoryComboboxProps) {
  const [query, setQuery] = useState<string>("");

  const filteredCategories =
    query === ""
      ? categories
      : categories?.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Field as="div">
      <FormLabel htmlFor="category" required>
        Post category
      </FormLabel>
      <Description className={"text-xs mb-2 text-gray-500"}>Please provide appropriate category for your desired post.</Description>
      <Combobox value={selectedCategory} onChange={setSelectedCategory} onClose={() => setQuery("")}>
        <div className="relative">
          <ComboboxInput
            id="category"
            placeholder="Select post category..."
            className={
              "w-full rounded-lg border py-1.5 px-3 text-sm/6 focus:outline-none data-[focus]:outline-gray-700/25  data-[focus]:outline-2 data-[focus]:-outline-offset-2"
            }
            aria-label="Category"
            displayValue={(category: Category | null) => {
              if (!category) {
                return "";
              }

              return category.name;
            }}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className={"group absolute inset-y-0 right-0 px-2.5"}>
            <ChevronDownIcon className="text-gray-700 size-4" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          transition
          anchor="bottom"
          className={clsx(
            "border w-[var(--input-width)] mt-1 rounded-lg border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)]",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredCategories?.length! > 0 ? (
            filteredCategories?.map((category) => (
              <ComboboxOption
                key={category._id}
                value={category}
                className={"group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-300/50"}
              >
                <CheckIcon className="invisible size-4 text-gray-500 group-data-[selected]:visible" />
                <div className="text-gray-800 text-sm/6">{category.name}</div>
              </ComboboxOption>
            ))
          ) : (
            <ComboboxOption
              value={null}
              disabled={true}
              className={"group text-sm/6 text-gray-500 flex cursor-default items-center rounded-lg py-1.5 px-3 select-none justify-center"}
            >
              No category found.
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}

export default CategoryCombobox;
