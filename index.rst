The next TOPAS user meeting will be at FRPT
===============================
Are you attending the FRPT meeting? Then come join us for the next TOPAS user meeting. Details to follow.


Welcome to the TOPAS documentation!
=======================================

The TOPAS_ toolkit aims to provide an intuitive Monte Carlo framework for medical physicists and researchers in related fields. TOPAS is based on the `Geant4 Simulation Toolkit`_ and offers specific extensions for application in Radiation Oncology. The text-based TOPAS parameter control system allows users to create their own Monte Carlo simulations using a large library of components and examples built by the TOPAS developers and its users, including particle sources, geometry components, scorers, outcome models, time features, etc. TOPAS provides immense flexibility to design your own simulation without writing C++ code.

In addition, TOPAS offers an extension mechanism that requires only minimal C++ coding for advanced users who want to add new functionalities. Extension classes have access to all of the features of TOPAS and Geant4. Since version 4.0, TOPAS has been released as OpenTOPAS and is based on Geant4.11. 

To discover the Geant4 version used by a specific version of TOPAS, please consult the :ref:`version` section.

.. note:: A PDF version of the documentation is found by clicking the "Read the Docs" panel in the bottom-right corner of the website.


.. toctree::
    :hidden:
    :maxdepth: 1
    :caption: Getting Started

    getting-started/install
    getting-started/authors
    getting-started/citation
    getting-started/users
    getting-started/G4_version


.. toctree::
    :hidden:
    :maxdepth: 1
    :caption: Simulation Control

    parameters/intro/index
    parameters/defaults
    parameters/overall/index
    parameters/material
    parameters/geometry/index
    parameters/source/index
    parameters/physics/index
    parameters/scoring/index
    parameters/graphics
    parameters/time
    parameters/variance/index
    parameters/outcome
    parameters/GUI
    parameters/parameter_optimization
    examples-docs/MVLinac/intro

.. toctree::
    :hidden:
    :maxdepth: 1
    :caption: Example Parameter Files

    examples-docs/Basic/index
    examples-docs/Brachytherapy/index
    examples-docs/Graphics/index
    examples-docs/MVLinac/index
    examples-docs/Nozzle/index
    examples-docs/Optical/index
    examples-docs/Outcome/index
    examples-docs/Patient/index
    examples-docs/PhaseSpace/index
    examples-docs/Scoring/index
    examples-docs/SpecialComponents/index
    examples-docs/TimeFeature/index
    examples-docs/UCSFETF/index
    examples-docs/VarianceReduction/index
 

.. toctree::
    :hidden:
    :maxdepth: 1
    :caption: How to Extend OpenTOPAS

    extension-docs/intro
    extension-docs/geometry
    extension-docs/source
    extension-docs/physics
    extension-docs/scoring
    extension-docs/outcome
    extension-docs/filtering
    extension-docs/field
    extension-docs/imaging
    extension-docs/user_hook
 

.. toctree::
    :hidden:
    :maxdepth: 1
    :caption: Provided Extensions

    extensions/rbe/intro
    extensions/imaging/index
    extensions/microdosimetry/intro

.. _TOPAS: https://github.com/OpenTOPAS/OpenTOPAS
.. _Geant4 Simulation Toolkit: https://geant4.web.cern.ch

