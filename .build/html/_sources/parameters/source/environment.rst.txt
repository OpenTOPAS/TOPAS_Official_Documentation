.. _source_environment:

Environment Source
------------------

The Environment source creates an isotropic, uniform radiation field enclosing a specified component. It provides a radiation field that might be experienced, for example, by a spacecraft in a
radiation belt, or by a robot (or, indeed a human) in a damaged nuclear reactor.

A notional radiation "cavity" is created enclosing all volumes in a
component. The cavity is a sphere of radius R.  Primary particles are
generated on the surface of the sphere, directed inwards, following a
cosine angular distribution (Lambert's cosine law) relative to the inward
direction. This produces an isotropic, homogeneous, "omnidirectional flux".

Even if the radiation has some directional dependency it is often the case
that the instrument (your detector) is rotating or moving about so the
flux will average to isotropic over time.

The basic definition of flux, f, which in principle can vary with
direction and position, is defined by:

.. math::

  \frac{dN}{dt} = f\times da \times d\Omega 

which is the rate of flow of particles out of an element of area da perpendicular to
the direction into an element of solid angle dOmega. If the flux is
homogenous and isotropic, we can define the "omnidirectional flux":

.. math::

  F = 4 \times \pi \times f 

which has units of number of particles per cm :sup:`2` per second.

Fluence is simply :math:`F \times T`, the flux F over a time period T, which means it has the units of number of particles per cm :sup:`2`.

One can derive equivalent definitions of fluence:

- the number of particles that enter a sphere of unit cross-sectional
  area;
- the track length per unit volume.

For N particles (histories), the fluence will be:

.. math::

  \frac{N}{\pi \times R^2} 

This is printed at the end of run. It is up to you to decide if this is enough
for your application. Thus:

- to simulate flux F for time T you need :math:`\pi \times R^2 \times F \times T` histories;
- or, given N histories, you will have simulated a time period :math:`T = \frac{N}{F \times \pi \times R^2}`

A test sphere of radius r will attract :math:`\frac{N \times r^2}{R^2}` particles.

A thin test disc of radius r will attract :math:`\frac{(N/2) \times r^2}{R^2}` particles.

The environment source type can be specified as follows::

  s:So/MySource/Type = "Environment"

See the example: :ref:`example_EnvironmentSource`

.. note::

    The world must be bigger than the radiation cavity, which may be bigger than a box enclosing your geometry. TOPAS will tell you if you need to increase the world size.

The energies and species of the emitted particles can be specified using the same parameters available to the :ref:`source_beam`.

