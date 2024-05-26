"use client";

import React, { useEffect, useState } from "react";
import { items } from "./items";
import styles from "./multiFilters.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MultiFilters() {
  const pathname = usePathname();
  const queryparams = useSearchParams();
  const { push, replace } = useRouter();

  const filtersQuery = queryparams.get("category");
  //const filterFromQuery = filtersQuery && fil
  console.log(filtersQuery && filtersQuery.split(" "));
  const [selectedFilters, setSelectedFilters] = useState(
    (filtersQuery && filtersQuery.split(" ")) || []
  );

  const [filteredItems, setFilteredItems] = useState(items);

  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  const handleFilterButtonClick = (category) => {
    if (selectedFilters.includes(category)) {
      let filters = selectedFilters.filter(
        (otherFilters) => otherFilters !== category
      );
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  useEffect(() => {
    let sp = new URLSearchParams(queryparams);
    if (selectedFilters.length === 0) {
      sp.delete("category");
    } else {
      sp.set("category", [...selectedFilters].join(" "));
    }
    replace(`${pathname}?${sp.toString()}`);
    getFilter();
  }, [selectedFilters]);

  function getFilter() {
    if (selectedFilters.length > 0) {
      let filterdValue = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        return temp;
      });
      //console.log(filterdValue);
      setFilteredItems(filterdValue.flat());
    } else setFilteredItems([...items]);
  }

  return (
    <div>
      <div className={styles.buttons_container}>
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`${styles.button} ${
              selectedFilters?.includes(category) ? styles.active : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.items_container}>
        {filteredItems.map((item, idx) => (
          <div key={`items-${idx}`} className={styles.item}>
            <p>{item.name}</p>
            <p className={styles.category}>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
