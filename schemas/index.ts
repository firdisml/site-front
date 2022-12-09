import * as yup from "yup";

export const basicSchema = yup.object().shape({
    job_title: yup.string().required("Enter valid job title"),
})