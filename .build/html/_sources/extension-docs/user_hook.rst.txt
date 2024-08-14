.. _extension_hooks:

Additional User Hooks
=====================

.. highlight:: c++

Six additional hooks are provided in TsExtensionManager_ for you to attach your own code, namely:

* BeginSession
* BeginRun
* BeginHistory
* EndHistory
* EndRun
* EndSession

The first line of the .cc file must be of the form::

    // BeginSession for TOPAS
    // BeginRun for TOPAS
    // BeginHistory for TOPAS
    // EndHistory for TOPAS
    // EndRun for TOPAS
    // EndSession for TOPAS

There are no particular constraints on what you can do in these methods. They are provided simply to give you more flexibility in the design of your extensions.

.. _TsExtensionManager: https://github.com/OpenTOPAS/OpenTOPAS/tree/main/extensions