document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculateButton");
  const form = document.getElementById("carForm");
  const tripType = document.querySelectorAll('input[name="trip_type"]');
  const fuelType = document.querySelectorAll('input[name="fuel_type"]');
  const mpg = document.getElementById("mpg");
  const startDestination = document.getElementById("from");
  const endDestination = document.getElementById("to");
  const mpgError = document.getElementById("mpgError");
  const formError = document.getElementById("formError");

  // Checks that the input is a valid number with regex
  const numberCheck = (value) => {
    return /^\d+(\.\d+)?$/.test(value);
  };

  function validateForm() {
    const tripTypeSelected = Array.from(tripType).some(
      (input) => input.checked
    );
    const fuelTypeSelected = Array.from(fuelType).some(
      (input) => input.checked
    );

    // Checks that the inputs are filled
    const mpgFilled = mpg.value.trim() !== "";
    const startDestinationFilled = startDestination.value.trim() !== "";
    const endDestinationFilled = endDestination.value.trim() !== "";
    const mpgValidValue = numberCheck(mpg.value.trim());

    if (mpgFilled && !mpgValidValue) {
      mpgError.style.display = "inline";
    } else {
      mpgError.style.display = "none";
    }

    if (
      tripTypeSelected &&
      fuelTypeSelected &&
      mpgFilled &&
      mpgValidValue &&
      startDestinationFilled &&
      endDestinationFilled
    ) {
      // Code referenced from [https://stackoverflow.com/questions/13931688/disable-enable-submit-button-until-all-forms-have-been-filled]
      calculateButton.disabled = false;
      formError.style.display = "none";
    } else {
      calculateButton.disabled = "disabled";
      formError.style.display = "inline";
    }
  }
  // Listens for changes in the input fields then re-runs the validate form method upon change
  form.addEventListener("change", validateForm);
  form.addEventListener("input", validateForm);
});
