.. _release_notes:

Release Notes
=============

OpenTOPAS v4.3.0
----------------

Core OpenTOPAS v4.3.0 supports Geant4 11.3.2 and 11.4.2, with full core
regression testing completed for both. See :ref:`version` for extension-specific
compatibility.

New features
~~~~~~~~~~~~

* The graphical interface can submit and monitor simulations using AWS.
* Geant4 physics constructors registered with the Geant4 physics-constructor registry
  can be named directly in a modular physics list.
* Physics-module names and aliases are resolved case-insensitively.
* Output headers for logarithmically binned scorers contain the information needed to
  reconstruct the bin edges.
* Geant4 11.4 data-library versions are recognized by the startup and installation checks.

* Optional geometry navigation controls expose ``Smartless`` and
  ``UseVoxelOptimisation``.
* Additional field stepper and integration-accuracy controls are available;
  stepper values are case-insensitive.
* Optional Geant4 11.4 controls expose regional energy-loss fluctuations and
  selected hadronic settings. Omitted parameters leave the corresponding
  Geant4 settings unchanged.
* Restored scorer results can be used for outcome modeling without repeating
  particle transport, including RT Structure Set filtering for patient grids.
  The read-back requirements and the distinct roles of
  ``OutcomeOutputScaleFactor`` and ``OutputWeightingFactor`` are documented in
  :ref:`parameters_outcome`.
* Container image names identify both TOPAS and Geant4 versions, with amd64,
  arm64, and combined multi-architecture tags. See :ref:`container_images`.

Physics compatibility
~~~~~~~~~~~~~~~~~~~~~

* Public TOPAS-nBio currently requires Geant4 11.3.2; its chemistry is
  incompatible with 11.4.2. This restriction does not apply to core OpenTOPAS.
* The default ``EMRangeMax`` is 600 MeV. With Geant4 11.3 and later, values below
  600 MeV are rejected and ignored because standard ionisation and multiple-scattering
  models must remain available above the Geant4-DNA energy range.

Corrections
~~~~~~~~~~~

* Corrected ``RepeatSequenceUntilRelativeStandardDeviationLessThan`` when ``Mean`` is
  not explicitly included in a scorer's ``Report`` parameter.
* Corrected reading of ASCII phase-space files so that the final record is not processed
  twice.
* Corrected momentum handling for zero-kinetic-energy phase-space records.
* Corrected reading of Binary and Limited phase-space files larger than 2 GB on
  Windows. Binary and Limited phase-space data are now also opened explicitly in
  binary mode.
* Corrected Layered Mass Geometry when a parallel world is rooted in a ``Group``
  component.
* Improved Qt 5 and Qt 6 compatibility.
* Restored the default Qt layout to show the ``Scene tree`` and ``Parameter Control``
  tabs, retained the Exit action, and added the Point Cloud action.
* Improved discovery of graphical-interface icons and other resources relative to the
  OpenTOPAS executable.
