import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();

  // _(items) - convert 'items' array to lodash wrapper
  // .value() - get back 'items' array from the wrapper
}
