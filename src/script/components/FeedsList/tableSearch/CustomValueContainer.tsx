import { ReactNode } from 'react';
import { ValueContainerProps, components } from 'react-select';
import { SelectOptionFeeds } from '../../../models';

function CustomValueContainer({
  children,
  ...props
}: ValueContainerProps<SelectOptionFeeds>) {
  let [values, input] = children as ReactNode[];

  if (Array.isArray(values)) {
    const isAllSelected = (values[0] && values[0].props.data.value === 'all');
    values = isAllSelected ? 'All': `${values.length} selected`;
  }

  return (
    <components.ValueContainer {...props}>
      {values}
      {input}
    </components.ValueContainer>
  );
}

export default CustomValueContainer;
