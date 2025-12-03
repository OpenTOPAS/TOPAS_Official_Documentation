Statistical Information
-----------------------

.. _statistical_information:

By default, scorers will report the sum of the scored quantity over all histories, but many additional reporting options are available::

    sv:Sc/MyScorer/Report = 1 "Sum" # One or more of Sum, Mean, Histories, Count_In_Bin, Second_Moment, Variance, Standard_Deviation, Min, Max

Output columns will be in the same order as the values in the ``Report`` parameter.

When there is binning by energy or time, and there is more than one ``Report`` option (such as ``"Sum"`` and ``"Mean"``), the output will be ordered as:

* Sum (underflow), Mean (underflow), Sum (bin 1), Mean (bin 1), Sum (bin 2), Mean (bin 2), etc.

``"Histories"`` is the total number of histories that were simulated while this scorer was active (that is, excludes any histories that were produced when this scorer was gated to inactive).

``"Count_In_Bin"`` is the number of histories that contributed to this bin (that is, excludes any histories for which no particles hit this bin).

If only ``"Sum"`` is requested, simple accumulation is used.
If ``"Mean"``, ``"Second_Moment"``, ``"Variance"`` or ``"Standard_Deviation"`` is requested, accumulation uses a numerically stable algorithm from:
B. P. Welford (1962) and presented in Donald E. Knuth (1998). The Art of Computer Programming, volume 2: Seminumerical Algorithms, 3rd edn., p. 232. Boston: Addison-Wesley:

.. code-block:: plain

    for x in data:
        n = n+1
        delta = x - mean
        mean = mean + delta/n
        M2 = M2 + delta*(x - mean)
    sum = n * mean
    variance = M2/(n - 1)
    standard deviation = sqrt(variance)

The implementation in Topas uses a single, numerically stable Knuth/Welford update for mean and variance, replacing the legacy Knuth implementation with a lower-memory
per-bin state. Per bin, the scorer tracks:

- `sum` (first moment)
- `count` (histories seen in the bin)
- `mean` and `M2` (running Welford accumulators for variance)

The **current implementation** works on each hit, updates `sum`, increments `count`, and performs a
constant-time Welford step on `mean`/`M2` for that bin. Untouched bins do not participate in the calculation; zeros are accounted for at output via total history count.
Thus, an extra array is introduced increasing the memory footprint (~1.4x) but with an acceleration of ~5.5x compared to the legacy implementation.

In the **legacy implementation** the variable updates were followed by an O(NBins) loop each event to
pad zeros into variance state for bins not hit in that event, so per-event
work scaled with total bins rather than hits.

Memory footprint example
~~~~~~~~~~~~~~~~~~~~~~~~
As an example of memory requirement, let's consider a 200×200×200 grid (8,000,000 bins), reporting Sum, Mean, and 
Standard_Deviation (all doubles). In that scenario:

- First moment (sum): 8,000,000 × 8 bytes ≈ 64 MB
- Mean accumulator: 8,000,000 × 8 bytes ≈ 64 MB
- M2 accumulator: 8,000,000 × 8 bytes ≈ 64 MB
- Count (long): 8,000,000 × 8 bytes ≈ 64 MB
- Min/Max (if requested): each adds 8,000,000 × 8 bytes ≈ 64 MB

The total per scorer thread is ~256 MB. In a multithreaded run, each worker and the 
master hold their own copy. Thus, on a 24-thread run, that is roughly
24 × 256 MB ≈ 6 GB for the workers plus one master copy (~256 MB), giving a total
around 6.25 GB for this scorer. Reducing the number of threads or voxel count reduces the 
total RAM accordingly.

Standard deviation of the mean and sum 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TOPAS calculates the variance (and hence the standard deviation) associated with the distribution of the quantity of interest (dose, fluence, etc).

* For the standard deviation of the mean value, divide the standard deviation from TOPAS by the square root of the total number of histories.
* For the standard deviation of the sum, multiply the standard deviation from TOPAS by the square root of the total number of histories.

