import React from "react";
//import 'react-dates/initialize';
//import { withRouter } from 'react-router';
import { Form, FormSpy, Field } from "react-final-form";
//import { DateRangePicker } from 'react-dates';

import moment from "moment";
//import { ReduxFormWrapper, Select, SelectItem, DateRangePickerInput } from '@wfp/ui';

const MyForm = props => {
  const { onSubmit } = props;
  return null;
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        lastDates: props.match.params.time
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {/* <Blockquote code>{JSON.stringify(values, 0, 2)}</Blockquote> */}
          <FormSpy
            onChange={props => {
              handleSubmit();
            }}
            subscription={{ values: true }}
          />
          <div className="history__form">
            <Field
              name="lastDates"
              component={ReduxFormWrapper}
              inputComponent={Select}
            >
              <SelectItem value="today" text="today" />
              <SelectItem value="yesterday" text="yesterday" />
              <SelectItem value="last-week" text="last week" />
              <SelectItem value="last-month" text="last month" />
              <SelectItem value="last-year" text="last year" />
              <SelectItem value="custom" text="custom" />
            </Field>

            {values.lastDates === "custom" && (
              <div className="history__form__custom">
                {/*<Field
                  name="dateRange"
                  component={ReduxFormWrapper}
                  inputComponent={DateRangePickerInput}
                  datePicker={DateRangePicker}
                  appendToBody
                  onClose={handleSubmit}
                  isOutsideRange={day => (moment().diff(day) < 0)}
                />*/}
                {/*
                <Button type="submit">
                  Update
                </Button>
                */}
              </div>
            )}
          </div>
        </form>
      )}
    />
  );
};

export default MyForm;
