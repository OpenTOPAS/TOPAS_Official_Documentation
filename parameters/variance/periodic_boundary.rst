.. _vr_periodic_boundary:

Periodic Boundary Condition
---------------------------

In this technique, secondary particles that leave a user-defined box are put back at the opposite plane of exit. The technique is useful in simulation setups (small volumes) where loss of charge particle equilibrium exists, so that a good setup (usually increasing the size) to achieve that condition would require a prohibitive computation time.

.. warning::

    Only apply to secondary particles.

This technique is applied per volume, then the user is responsable to assign the components desired to this technique, and the particles::

    b:Vr/UseVarianceReduction         = "true"
    b:Vr/periodicboundarycondition/Active         = "true"
    s:Vr/periodicboundarycondition/Type = "periodicboundarycondition"
    sv:Vr/periodicboundarycondition/ParticlesNamed  = 1 "e-" 
    sv:Vr/periodicboundarycondition/ApplyBiasingInVolumesNamed = 1 "PBC"

.. image:: periodic_boundary_condition.png
