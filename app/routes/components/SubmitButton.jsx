import { useIsSubmitting } from "remix-validated-form";

const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={isSubmitting ? "disabled-btn submit" : "submit"}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
