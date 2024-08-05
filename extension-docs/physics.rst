.. _extension_physics:

Custom Physics Lists and Physics Modules
========================================

.. highlight:: c++

The first line of the .cc file must be of the form::

    // Physics List for MyPhysicsList1
    or
    // Physics Module for MyPhysicsModule1

You can supply your own physics list or physics module. 

.. warning::

    This option is not recommended unless you have significant Geant4 expertise. Even most long-time Geant4 users find it difficult to write their own physics lists and physics modules. Wherever possible, you should try to use one of the :ref:`Reference <physics_reference>` or :ref:`Modular <physics_modular>` physics lists with pre-written Geant4 physics modules.


Check the `physics`_ folder of the TOPAS for examples of how to create your own physics list. You will see that these files include pointers to the TOPAS parameter manager as their arguments. This is not required, but allows you to use TOPAS parameters to adjust options within your list or modules.

.. _physics: https://github.com/OpenTOPAS/OpenTOPAS/tree/main/physics