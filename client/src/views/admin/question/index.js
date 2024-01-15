import FormBuilder from "components/formBuilder";
import React from "react";

const Question = () => {
  return (
    <div className="mt-2 mb-8 w-full">
      <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
        General Information
      </h4>
      <p className="mt-2 px-2 text-base text-gray-600">
        As we live, our hearts turn colder. Cause pain is what we go through as
        we become older. We get insulted by others, lose trust for those others.
        We get back stabbed by friends. It becomes harder for us to give others
        a hand. We get our heart broken by people we love, even that we give
        them all...
      </p>
      <FormBuilder />
    </div>
  );
};

export default Question;
