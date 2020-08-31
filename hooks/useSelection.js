import {useState, useCallback} from "react";
import {contains} from "validate.js";
import {
  ifElse,
  without,
  append,
  intersection,
  equals,
  always,
  pick,
  map,
  is
} from "ramda";

export const useSelection = (data, CompareKeys = ["value", "text"]) => {
  const getCompareObject = pick(CompareKeys);
  const getCompareObjectMpper = map(getCompareObject);
  const getCompare = ifElse(is(Array), getCompareObjectMpper, getCompareObject);
  const [selectedlist, setSelectedList] = useState([]);
  /** will add and remove the selection  */
  // toggleSelection :: a → [a]||[]
  const toggleSelection = useCallback(
    (value) =>
      setSelectedList(
        ifElse(
          contains(getCompare(value)),
          without(getCompare(value)),
          append(getCompare(value))
        )
      ),
    [getCompare]
  );
  const setSelected = useCallback(
    (values) => setSelectedList(getCompare(values)),
    [getCompare]
  );
  /** hepsinin sechilmish oldugu hakkinda bir bilgi */
  // isAllSelected :: [{*}] → [{*}] → Boolean
  const isAllSelected = equals(
    intersection(getCompare(selectedlist), getCompare(data)),
    getCompare(data)
  );
  // toggleAllSelection :: Boolean → [{*}] → [{*}]||[]
  const toggleAllSelection = useCallback(() => {
    setSelectedList(always(isAllSelected ? [] : getCompare(data)));
  }, [isAllSelected, getCompare, data]);
  // isSelected :: {*} → Boolean
  const isSelected = useCallback(
    (value) => contains(getCompare(value), getCompare(selectedlist)),
    [getCompare, selectedlist]
  );
  return {
    selectedlist: getCompare(selectedlist),
    isAllSelected,
    toggleAllSelection,
    toggleSelection,
    isSelected,
    setSelected,
    getCompare,
    CompareKeys
  };
};
