.. _parameters_outcome:

Outcome Modeling
================

TOPAS can directly perform outcome modeling, such as calculating Tumor Control
Probabilities (TCP) and Normal Tissue Complication Probabilities (NTCP).

Expanding on the ability to produce a Dose Volume Histogram (DVH), TOPAS can
apply outcome models to either a differential or cumulative DVH. A variety of
standard models from the literature is provided, and custom outcome models can
be added through the TOPAS Extensions interface.

Starting from an existing dose scorer, request a differential or cumulative
volume histogram if the outcome model should use a DVH::

    sv:Sc/ScorerName/Report = 1 "DifferentialVolumeHistogram"

The alternative is ``"CumulativeVolumeHistogram"``. TOPAS internally converts
a cumulative DVH to a differential DVH before evaluating an outcome model.
See :ref:`example_outcome_testoutcomemodel` for an example that runs several
models on a patient dose.

Restoring a Previous TOPAS Result
---------------------------------

TOPAS can restore a previously written binned scorer result and apply new
outcome models without repeating particle transport. This restores the scored
bin values, not a standalone DVH file. TOPAS then generates the requested DVH
or uses the restored dose distribution and evaluates the outcome models.

Enable restoration globally and identify the input for every scorer::

    b:Ts/RestoreResultsFromFile = "True"

    s:Sc/ScorerName/InputFile = "SavedDose" # basename, without an extension
    s:Sc/ScorerName/InputType = "Binary"    # "Binary" or "CSV"

For binary input, both ``SavedDose.binheader`` and ``SavedDose.bin`` must be
available. For CSV input, ``SavedDose.csv`` must be available. File names are
case-sensitive, while the ``InputType`` value is case-insensitive.

The restored scorer definition must have the same quantity and spatial,
energy, and time binning as the scorer that produced the file. The saved
columns must also contain enough information to construct the newly requested
``Report`` values. For example, ``Sum`` is sufficient for a DVH; a new
``Mean`` can be calculated from ``Sum`` and
``Histories_with_Scorer_Active``. See :ref:`scoring_restore_results` for the
complete read-back requirements.

When restoration is enabled, TOPAS initializes the geometry and scorers but
does not run particle histories. Output type and report options may differ
from those used to create the saved result, allowing conversion between CSV
and binary output as well as new DVH and outcome calculations.

For a scorer on a ``TsDicomPatient``, the restored dose grid can be combined
with the current DICOM RT Structure Set. Add
``OnlyIncludeIfInRTStructure`` or ``OnlyIncludeIfNotInRTStructure`` to the
scorer, and TOPAS applies that structure mask to the restored voxel values
before generating the DVH and evaluating the outcome model. The RT Structure
Set may be detected automatically in the patient's ``DicomDirectory`` or
specified with ``Ge/Patient/DicomRTStructFile``. The scorer ``InputFile``
continues to identify the CSV or binary TOPAS result, not a ``.dcm`` file. See
:ref:`scoring_restore_results` and :ref:`geometry_patient_dicom` for the full
requirements.

See :ref:`example_outcome_testrestoremodel` for a complete binary read-back
example.

Configuring Outcome Models
--------------------------

If no volume histogram is requested, TOPAS evaluates the outcome model from
the full dose distribution in the scored component. In that case TOPAS assumes
that all spatial bins have equal volume and internally converts them to
fractional volumes.

Outcome modeling is activated by listing one or more models::

    sv:Sc/ScorerName/OutcomeModelName = 2 "LKB" "CriticalElement"

The dose distribution can optionally be scaled before outcome evaluation::

    u:Sc/ScorerName/OutcomeOutputScaleFactor = 1.e6

``OutcomeOutputScaleFactor`` multiplies only the dose values passed to the
outcome model. It does not change the scorer's CSV, binary, ROOT, XML, or DICOM
output, and it does not change a volume histogram written by the scorer. This
makes it suitable for applying a normalization to a restored dose distribution
without modifying the restored scorer values. If the parameter is omitted,
the outcome model uses the dose values without additional scaling.

Do not confuse this parameter with ``OutputWeightingFactor``. The latter is
available for the ``DoseToMedium``, ``DoseToWater``, and ``DoseToMaterial``
quantities and multiplies each dose contribution during particle transport,
before scorer accumulation. It therefore changes the saved dose distribution,
volume histogram, and outcome calculation, but it cannot rescale data that
have already been restored. See :ref:`scoring_output_weighting_factor`.

If both parameters are used in a simulation, ``OutputWeightingFactor`` first
scales the accumulated dose and ``OutcomeOutputScaleFactor`` then applies an
additional, multiplicative scaling only for the outcome calculation.

Set the input parameters for each named model, for example::

    u:Sc/ScorerName/LKB/n = 0.25
    u:Sc/ScorerName/LKB/m = 0.15
    u:Sc/ScorerName/LKB/TD50 = 60
    u:Sc/ScorerName/CriticalElement/Gamma = 2.8
    u:Sc/ScorerName/CriticalElement/TD50 = 60

For the LKB, CriticalElement, CriticalVolume, and Poisson models, parameters
can instead be loaded from the internal organ database. Include the model name
in the parameter path::

    s:Sc/ScorerName/LKB/UsePresetParametersFromOrganNamed = "Kidney"

If the organ name is not found, TOPAS displays the available names and stops.

The outcome value (NTCP or TCP in percent) is displayed for every model and
scorer. When a CSV or binary DVH is written, the outcome values are also
included in its header.

The following references contain model parameters for several organs::

    C. Burman, G. J. Kutcher, B. Emami and M. Goitein, “Fitting of normal tissue tolerance data to an analytic function”, Int. J. Radiation Oncology Biol. Phys. 21, 123-135. (1991)
    B. Emami, J. Lyman, A. Brown, L. Coia, M. Goitein, J. E. Munzenrider, B. Shank. L. J. Solin and M Wesson “Tolerance of normal tissue to therapeutic irradiation”, Int. J. Radiation Oncology Biol. Phys. 21, 109-122. (1991)
    P. Okunieff, D. Morgan, A. Niemerko and D. Suit “Radiation dose-response of human tumors”, Int. J. Radiation Oncology Biol. Phys. 32(4), 1227-1237. (1995)
    P. Stavrev, A. Niemerko, N. Stavreva and M. Goitein, “The application of biological models to clinical data”, Physica Medica, 17(2), 2-13. (2001)
