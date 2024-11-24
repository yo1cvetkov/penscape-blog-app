import React, { useState } from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";
import CardWrapper from "../components/ui/CardWrapper";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Select } from "@headlessui/react";
import FormLabel from "../components/ui/FormLabel";
import FormInput from "../components/ui/FormInput";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useGetCategoriesQuery } from "../features/categories/api/categoryApiSlice";
import { Category } from "../features/categories/types/Category";
import { CheckIcon } from "@heroicons/react/24/outline";

function CreatePostPage() {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>("");

  const filteredCategories =
    query === ""
      ? data
      : data?.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  console.log(selected);
  return (
    <section className="w-full py-6 mx-auto">
      <div className="max-w-lg pt-32 mx-auto space-y-8">
        <h1 className="w-full mx-auto text-4xl font-bold">Create new post</h1>
        {isLoading ? (
          <div> Loading...</div>
        ) : (
          <CardWrapper className="mx-auto">
            <form>
              <Field as="div">
                <FormLabel>Post title</FormLabel>
                <FormInput />
              </Field>
              <Field as="div">
                <FormLabel>Post category</FormLabel>
                <div className="relative">
                  <Select
                    value={selected}
                    onChange={(event) => setSelected(event.target.value)}
                    className={clsx(
                      "mt-3 block w-full appearance-none rounded-lg border bg-white py-1.5 px-3 text-sm/6 text-gray-800",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-200/25",
                      // Make the text of each option black on Windows
                      "*:text-black"
                    )}
                  >
                    {data?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon className="group pointer-events-none absolute top-2.5 right-2.5 size-4 text-gray-600" aria-hidden="true" />
                </div>
              </Field>
            </form>
          </CardWrapper>
        )}
      </div>
    </section>
  );
}

export default CreatePostPage;
