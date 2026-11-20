.. _vr_inelastic_splitting:

Inelastic Splitting
------------------

Selecting geometry components
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For InelasticSplitting, select the geometry components to bias with
``ApplyBiasingInComponentsNamed``. For example, if a ``TsJaws`` component is
defined as ``Ge/Jaw/Type = "TsJaws"``, use::

    sv:Vr/InelasticSplitting/ApplyBiasingInComponentsNamed = 1 "Jaw"

This parameter is part of the InelasticSplitting configuration; the remaining
physics and splitting settings must also be provided.

TOPAS resolves each name as a geometry component and attaches the biasing
operator to its envelope and all volumes belonging to that component,
recursively including its child components. In the example above, this includes
the jaw envelope and both jaw blocks. It does not select an individual jaw block.
For a Group component, which has no envelope of its own, only its recursively
collected child volumes are selected; its parent's envelope is not selected.

An unknown component name gives a configuration error. Envelope logical-volume names such as
``Jaw/Jaw`` are not accepted as aliases for component names by this parameter.

Migrating existing inputs
~~~~~~~~~~~~~~~~~~~~~~~~~

For InelasticSplitting, ``ApplyBiasingInVolumesNamed`` is deprecated but remains
supported with its existing behavior. It matches component envelope
logical-volume names exactly, including case, and attaches the operator to the
matched component's envelope and recursively collected volumes. It does not
independently select arbitrary daughter logical volumes.

For a ``TsJaws`` component named ``Jaw``, replace::

    sv:Vr/InelasticSplitting/ApplyBiasingInVolumesNamed = 1 "Jaw/Jaw"

with::

    sv:Vr/InelasticSplitting/ApplyBiasingInComponentsNamed = 1 "Jaw"

Using the deprecated parameter emits a warning with migration guidance.
This deprecation applies to InelasticSplitting only.

