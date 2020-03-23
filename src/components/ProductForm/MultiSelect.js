import React, { Fragment } from 'react';

import Select from 'react-select';
import categories from '../../mocks/categories'

export const MultiSelect = ({ 
  handleMultiSelect, 
  values,
  isValidCategories,
}) => {
  const styles = {
    control: (provided) => ({
      ...provided,
      border: !isValidCategories && '1px solid #dc3545'
    })
  }
  return (
    <Fragment>
      {!isValidCategories 
        && 
      <div 
        style={{
          color: '#dc3545', 
          'font-size': '80%',
          }}>
          Please choose at least one category</div>}
      <Select
        isMulti
        closeMenuOnSelect={false}
        name="categories"
        options={categories}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleMultiSelect}
        value={values}
        styles={styles}
      />
    </Fragment>
  )
}

