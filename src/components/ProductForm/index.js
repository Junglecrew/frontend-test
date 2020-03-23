import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import DatePicker from 'reactstrap-date-picker';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap'

import { MultiSelect } from './MultiSelect'
import { useProductForm } from './useProductForm';

export const ProductForm = ({ 
  edit,
  match,
}) => {
  const {
    handleMultiSelect,
    hangleChangeName,
    hangleChangeRating,
    changeExpirationDate,
    hangleChangeItems,
    hangleChangeBrand,
    isValidName,
    isValidCategories,
    setNameIsValid,
    hangleChangeReceiptDate,
    timeError,
    handleSubmit,
    form,
  } = useProductForm({
      edit,
      match,
    })
  return (
    <Fragment>
      <NavLink exact={true} to={'/'}>
        <Button>Back</Button>
      </NavLink>
      {edit 
        ? <h1>Edit product</h1> 
        : <h1>Add new product</h1>
      }
      <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          onFocus={() => setNameIsValid(true)}
          maxLength='200'
          invalid={!isValidName}
          type="text" 
          name="name" 
          id="name" 
          placeholder="product name" 
          onChange={hangleChangeName}
          defaultValue={form.name || ''}
        />
        <FormFeedback>
          Please enter name
        </FormFeedback>
        <FormText>Name is required, max 200 chars</FormText>
      </FormGroup>

      <MultiSelect 
        handleMultiSelect={handleMultiSelect} 
        values={form.categories}
        isValidCategories={isValidCategories}
      />

      <FormGroup>
        <Label for="ratingSelect">Select Rating</Label>
        <Input
          type="select" 
          name="select" 
          id="ratingSelect"
          onChange={hangleChangeRating}
          defaultValue={form.rating}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="itemsCount">Items in stock</Label>
        <Input
          type="number"
          name="count"
          id="count"
          onChange={hangleChangeItems}
          defaultValue={form.itemsInStock}
        />
      </FormGroup>

      <FormGroup>
        <Label>Receipt Date</Label>
        <DatePicker 
          id="receiptDate" 
          value={form.receiptDate}
          onChange={hangleChangeReceiptDate}
        />
      </FormGroup>

      <FormGroup>
        <Label for="brand">Enter Brand</Label>
        <Input
          type="text"
          name="brand" 
          id="brand" 
          placeholder="enter product brand" 
          onChange={hangleChangeBrand}
          defaultValue={form.brand}
        />
      </FormGroup>

      <FormGroup>
        <Label>Expiration Date</Label>
        {
          timeError 
           && 
          <FormText color='danger'>
            The date should be more than 30 days from now
          </FormText>
        }
        <DatePicker 
          id="expirationDate" 
          value={form.expirationDate}
          onChange={changeExpirationDate}
          style={{border: timeError && '1px solid #dc3545'}}
        />
        <FormFeedback>Please enter name</FormFeedback>
      </FormGroup>
        <NavLink exact={true} to={'/'}>
          <Button onClick={handleSubmit}>Submit</Button>
        </NavLink>
      </Form>
    </Fragment>

  )
}

ProductForm.propTypes = {
  edit: PropTypes.bool,
  match: PropTypes.object,
};