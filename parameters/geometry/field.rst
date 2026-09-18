Electromagnetic Fields
----------------------

You can assign an electric, magnetic or combined electromagnetic field to any geometry component (with exception of Group components, which have no intrinsic extent). The field will extend into any child components unless they themselves have their own field.

To assign a field, add the parameter ``Field``, as in::

    s:Ge/MyComponent/Field = "DipoleMagnet" # "DipoleMagnet", "QuadrupoleMagnet", "MappedMagnet", "MagneticFieldMap", "ElectricFieldMap", "UniformElectroMagnetic" or your own definition

For ``"DipoleMagnet"``, specify dipole field and strength (see :ref:`example_special_dipole`)::

    u:Ge/MyComponent/MagneticFieldDirectionX = 0.0
    u:Ge/MyComponent/MagneticFieldDirectionY = 1.0
    u:Ge/MyComponent/MagneticFieldDirectionZ = 0.0
    d:Ge/MyComponent/MagneticFieldStrength = 3.0 tesla

For ``"QuadrupoleMagnet"``, specify the two components of the gradient (see :ref:`example_special_quadrupole`)::

    d:Ge/MyComponent/MagneticFieldGradientX = 1.0 tesla
    d:Ge/MyComponent/MagneticFieldGradientY = 1.0 tesla

For a mapped magnetic field, use ``"MappedMagnet"`` or the equivalent
``"MagneticFieldMap"`` value::

    s:Ge/MyComponent/Field = "MagneticFieldMap"
    s:Ge/MyComponent/MagneticField3DTable = "PurgMag3D.TABLE"

Both Opera 3D ``.TABLE`` files and ``.csv`` files are supported (see
:ref:`example_special_purgingmagnet`). File-extension matching is case-sensitive.

For a mapped electric field, use::

    s:Ge/MyComponent/Field = "ElectricFieldMap"
    s:Ge/MyComponent/ElectricField3DTable = "ElectricField.csv"

Mapped electric fields also support Opera 3D ``.TABLE`` files and ``.csv`` files.

A magnetic-field CSV file must contain columns ``X``, ``Y``, ``Z``, ``Bx``, ``By``
and ``Bz``. An electric-field CSV file must contain columns ``X``, ``Y``, ``Z``,
``Ex``, ``Ey`` and ``Ez``. Each header must specify its unit, for example::

    X [mm],Y [mm],Z [mm],Bx [T],By [T],Bz [T]

Position units may be ``mm``, ``cm`` or ``m``. Magnetic-field units may be ``T`` or
``G``. Electric-field units may be ``V/m``, ``V/cm``, ``kV/cm`` or ``MV/m``.

For ``"UniformElectroMagnetic"``, specify electric field and dipole magnetic field (see :ref:`example_special_electromagnet`)::

    u:Ge/MyComponent/ElectricFieldDirectionX = 1.0
    u:Ge/MyComponent/ElectricFieldDirectionY = 1.0
    u:Ge/MyComponent/ElectricFieldDirectionZ = 0.0
    d:Ge/MyComponent/ElectricFieldStrength   = 5000 kV/cm
    u:Ge/MyComponent/MagneticFieldDirectionX = 0.0
    u:Ge/MyComponent/MagneticFieldDirectionY = 1.0
    u:Ge/MyComponent/MagneticFieldDirectionZ = 0.0
    d:Ge/MyComponent/MagneticFieldStrength   = 5.0 tesla

If you have any other value in ``Field``, TOPAS will look in your extensions to find your own class that defines this field. See :ref:`extension_fields` for details on writing extension fields.

Field orientation is set by rotating the component.

You can visualize magnetic fields, with field intensity and direction depicted through a set of arrows::

    i:Gr/ViewA/MagneticFieldArrowDensity = 10

.. warning::

    Use ``MagneticFieldArrowDensity`` with caution. When combined with rotation it seems to sometimes cause crashes in polycone drawing (involved in drawing the arrowheads).

As with almost any TOPAS parameter, the Electric Field Strength, Dipole Magnet Strength, Quadrupole Magnet Gradient or Mapped Magnetic Field file can be set to change over time by using :ref:`time_feature` such as (see :ref:`example_special_quadanddipole`)::

    d:Ge/MyComponent/MagneticFieldStrength = Tf/BField1st/Value tesla

Fine control of the stepping algorithm can be done by changing the following parameters from their default values::

    s:Ge/MyComponent/FieldStepper = "ClassicalRK4"
    d:Ge/MyComponent/FieldStepMinimum = 1.0 mm
    d:Ge/MyComponent/FieldDeltaChord = 1.0e-1 mm

Additional optional Geant4 field-accuracy controls are::

    d:Ge/MyComponent/FieldDeltaOneStep = 0.01 mm
    d:Ge/MyComponent/FieldDeltaIntersection = 0.001 mm
    u:Ge/MyComponent/FieldMinimumEpsilonStep = 5.e-5
    u:Ge/MyComponent/FieldMaximumEpsilonStep = 1.e-3

Length-valued field controls must be greater than zero. With Geant4 11.4,
epsilon values must satisfy approximately
``2.22e-13 <= FieldMinimumEpsilonStep <= FieldMaximumEpsilonStep <= 0.01``.
These four parameters have no TOPAS defaults: TOPAS calls the Geant4 setter
only when the corresponding parameter is present.

See the Geant4 Application Developers Guide on the `Geant4 Documention Page  <https://geant4.web.cern.ch/support/user_documentation>`_ for detailed discussion of these options.

Stepper choices for purely magnetic fields are:

* "ExplicitEuler"
* "ImplicitEuler"
* "SimpleRunge"
* "SimpleHeum"
* "HelixExplicitEuler"
* "HelixImplicitEuler"
* "HelixSimpleRunge"
* "CashKarpRKF45"
* "RKG3"
* "ClassicalRK4"
* "BogackiShampine23"
* "BogackiShampine45"
* "ConstRK4"
* "DormandPrince745"
* "DormandPrinceRK56"
* "DormandPrinceRK78"
* "ExactHelix"
* "NystromRK4"
* "TsitourasRK45"
* "QSS2"
* "QSS3"

Stepper choices for electromagnetic fields are:

* "ExplicitEuler"
* "ImplicitEuler"
* "SimpleRunge"
* "SimpleHeum"
* "ClassicalRK4"
* "BogackiShampine23"
* "BogackiShampine45"
* "DormandPrince745"
* "DormandPrinceRK56"
* "DormandPrinceRK78"
* "TsitourasRK45"

``FieldStepper`` values are case-insensitive. An unrecognized value causes
TOPAS to stop with an error rather than silently selecting another stepper.
