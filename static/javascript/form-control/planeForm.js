document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculateButton");
  const form = document.getElementById("flightForm");
  const tripType = document.querySelectorAll('input[name="trip_type"]');
  const fuelType = document.querySelectorAll('input[name="fuel_type"]');
  const startDestination = document.getElementById("from");
  const endDestination = document.getElementById("to");
  const formError = document.getElementById("formError");
  function validateForm() {
    const tripTypeSelected = Array.from(tripType).some(
      (input) => input.checked
    );
    const fuelTypeSelected = Array.from(fuelType).some(
      (input) => input.checked
    );
    const startDestinationFilled = startDestination.value.trim() !== "";
    const endDestinationFilled = endDestination.value.trim() !== "";

    if (
      tripTypeSelected &&
      fuelTypeSelected &&
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
