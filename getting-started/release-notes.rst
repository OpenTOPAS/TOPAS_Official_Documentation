.. _release_notes:

Release Notes
=============

OpenTOPAS v4.3.0
----------------

OpenTOPAS v4.3.0 is built against Geant4 11.4.2.

New features
~~~~~~~~~~~~

* The graphical interface can submit and monitor simulations using AWS.
* Geant4 physics constructors registered with the Geant4 physics-constructor registry
  can be named directly in a modular physics list.
* Physics-module names and aliases are resolved case-insensitively.
* Output headers for logarithmically binned scorers contain the information needed to
  reconstruct the bin edges.
* Geant4 11.4 data-library versions are recognized by the startup and installation checks.

Physics compatibility
~~~~~~~~~~~~~~~~~~~~~

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
* Improved Qt 5 and Qt 6 compatibility.
* Improved discovery of graphical-interface icons and other resources relative to the
  OpenTOPAS executable.
