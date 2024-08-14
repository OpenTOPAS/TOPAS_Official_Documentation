.. _extensions:

Introduction to Extensions
==========================

While most TOPAS users will find that they can implement everything they want from parameter files, those who require additional functionality are free to write their own C++ code to extend TOPAS. Your code can take advantage of the full syntax richness of C++. You may use almost any Geant4 class in your work.

These new classes can be:

* Geometry Components
* Scorers
* Outcome Models
* Filters
* Physics Lists and Physics Modules
* Particle Sources
* Magnetic Field Descriptions
* ElectroMagnetic Field Descriptions
* Imaging To Material Converters

And you can also provide classes that will be called to do whatever you want at the:

* Start or End of a Session
* Start or End of a Run
* Start or End of a History

As the first line of each of your classes, you will provide very specific comment lines that tells us how to weave your class into the rest of TOPAS.
For example, to define your own Geometry Component, your class will start with something like:

.. code-block:: c++

    // Component for MyComponent1

This tells TOPAS that your class defines a Geometry Component, and that this component should be used if a parameter file has the matching component type::

    s:Ge/something/Type = "MyComponent1"

.. note::

    C++ does not require that a given file, such as MyComponent1.cc, contain a class of the same name. However the TOPAS make system **does** require that this file name and class name match. So, for example, a file named MyComponent1.cc and its corresponding MyComponent1.hh must contain a class named MyComponent1.

TOPAS extension examples can be found on the GitHub_ page. We encourage users who are interested in creating extensions to have a look at the appropriately named folder, i.e. `geometry`_ for examples on how to create geometry extensions, or `scoring`_ for examples on how to create scorer extensions. Two of the main extensions currently available are the `TOPAS-nBio`_ and `TOPAS-imaging`_ extensions.

While it is beyond the scope of this User Guide to teach C++ programming, one issue that has come up a few times might be worth mentioning. Any time you see an example use a variable with a name starting with f, such as fEnvelopeLog or fEnevelopePhys, you should be careful not to redeclare your own local version of this variable.
So go ahead and set them as follows:

.. code-block:: c++

    fEnvelopeLog = CreateLogicalVolume(something);
    fEnvelopePhys = CreatePhysicalVolume(fEnvelopeLog);

Do **not** do the following:

.. code-block:: c++

    G4LogicalVolume* fEnvelopeLog = CreateLogicalVolume(something);
    G4VPhysicalVolume* fEnvelopePhys = CreatePhysicalVolume(fEnvelopeLog);

The latter would create a new, local copy of the variable, and would mean that when the base classes go to do other work with
these objects, they would find them to be unset, giving various crashes (probably segmentation faults).
You can read more elsewhere about this general topic: `Variable Shadowing`_.

To build your new TOPAS executable that incorporates all of your extensions, you run ``cmake`` with an argument that tells it the location of your extensions. Your extensions then coexist with the rest of the TOPAS code. You can even have subdirectories within your extensions directory, so that you might for example have different subdirectories with extensions from different collaborators:

.. code-block:: plain

    extensions/my_extensions_from_university_a
    extensions/my_estensions_from_company_b
    extensions/some_other_extensions

Our ``cmake`` script will recursively search your extensions directory to take all of your extensions into consideration. Even when you have to write your own C++ code, TOPAS work is still easier than plain Geant4. You write your extensions as concrete implementations of TOPAS base classes which provide a wealth of helper functions to simplify your work. You may use the TOPAS parameter system to provide parameters to your classes, and those parameters can vary in time, like any other TOPAS parameters. All user extensions have a pointer to the parameter manager in their constructor. Thus, to access TOPAS parameters, call one of the following methods: ``fPm->someMethod``.

In all of the following forms, the parameterName argument can be either a ``G4String`` or a ``char*``.

.. code-block:: c++

    // See if parameter exists
    G4bool ParameterExists(parameterName);
    // Get number of values in a vector parameter
    G4int GetVectorLength(parameterName);
    // Get dimensioned double value of parameter in Geant4's internal units
    G4double GetDoubleParameter(parameterName, const char* unitCategory);
    // Get double value of a unitless parameter
    G4double GetUnitlessParameter(parameterName);
    // Get integer value of parameter
    G4int GetIntegerParameter(parameterName);
    // Get Boolean value of parameter
    G4bool GetBooleanParameter(parameterName);
    // Get string value of parameter (whether it is actually a string parameter of not)
    G4String GetStringParameter(parameterName);
    // Get vector of dimensioned double values of parameter in Geant4's internal units
    G4double* GetDoubleVector(parameterName, const char* unitCategory);
    // Get vector of double values of a unitless parameter
    G4double* GetUnitlessVector(parameterName);
    // Get vector of integer values of parameter
    G4int* GetIntegerVector(parameterName);
    // Get vector of Boolean values of parameter
    G4bool* GetBooleanVector(parameterName);
    // Get vector of string values of parameter
    G4String* GetStringVector(parameterName);
    // Get TwoVector of double values of parameter in Geant4's internal units
    G4TwoVector GetTwoVectorParameter(parameterName, const char* unitCategory);
    // Get ThreeVector of double values of parameter in Geant4's internal units
    G4ThreeVector GetThreeVectorParameter(parameterName, const char* unitCategory);


We believe this extensions mechanism should allow you to do almost anything you like from within TOPAS. If you find any significant limitations, please reach out to us on the GitHub Discussions_ tab. We want to enable your unique research.


Extra Classes
~~~~~~~~~~~~~

The first line of the .cc file must be of the form::

    // Extra Class for use by TsMyBeginHistory

Any of your extension classes are welcome to themselves instantiate other classes. You just need to advise us to link in these classes by providing the above special line.


.. _changeable_parameters:

Changeable Parameters
~~~~~~~~~~~~~~~~~~~~~

In general, parameters cannot change once the TOPAS session has begun. Changes due to :ref:`time_feature` are fine (since the time feature's behavior itself is well defined), but any other change violates basic principles of repeatability.

C++ code that changes a parameter during the session, aside from time features, is allowed only for a special case in which a specialized geometry component needs to set a parameter value on the fly. An example is when TsCompensator reads in the compensator definition from a special file format. The resulting compensator thickness updates a parameter that affects positioning of other components.

Such a special case is allowed if the relevant parameter is defined from the start to be "Changeable". This is done by adding a ``c`` at the end of the parameter type, for example::

    dc:Ge/Compensator/TransZ = 2. cm # the initial dc indicates that this is a double that is changeable

For vector parameters, the ``c`` still comes just before the colon, for example::

    svc:...

In a complex parameter file chain, if any level of the chain redefines this as just a ``d`` rather than a ``dc``, other parameter files will see this as a non-changeable parameter. Thus one parameter file may lock out others from making such changes.

.. note::

    TOPAS makes note of which parts of the system uses this changeable parameter (either directly or through a chain of parameters depending on other parameters) and takes care to explicitly update those parts of the system if this parameter ever changes.

    Of course any parameter value can override the same parameter's value from a parent parameter file. This override at initial parameter read-in time is not what we mean by changeable. By Changeable we mean a value that changes during the TOPAS session.

The ``c`` syntax is not required when you are simply setting a parameter's value to a time feature. We allow::

    d:Ge/Propeller/RotZ = Tf/PropellerRot/Value

It is true that this ``Tf/PropellerRot/Value`` is changeable, but that is handled internally by TOPAS.


.. _transient_parameters:

Transient Parameters
~~~~~~~~~~~~~~~~~~~~

When a parameter is changed during the session, either because it is a time feature value, or because some piece of C++ code changes the parameter, TOPAS does not actually overwrite the original parameter in memory, but instead adds it to a "Transient Parameter" list. This list always takes precedence over any other parameters file.

Transient parameters may be the first occurrence of a given parameter, as for the materials for a patient that are only instantiated as the patient is read in from DICOM, or transient parameters may override previously-defined parameters.

.. _GitHub: https://github.com/OpenTOPAS/OpenTOPAS
.. _geometry: https://github.com/OpenTOPAS/OpenTOPAS/tree/main/geometry
.. _scoring: https://github.com/OpenTOPAS/OpenTOPAS/tree/main/scoring
.. _TOPAS-nBio: https://github.com/OpenTOPAS/TOPAS-nBio
.. _TOPAS-imaging: https://github.com/OpenTOPAS/TOPAS-imaging
.. _Variable Shadowing: https://en.wikipedia.org/wiki/Variable_shadowing
.. _Discussions: https://github.com/OpenTOPAS/OpenTOPAS/discussions

