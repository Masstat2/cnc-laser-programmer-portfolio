# Laser Cutting Quick Reference

A short reference for sheet-metal gauges and everyday laser programming and nesting habits. These are general good practices, not a description of any one shop's process.

## Sheet-metal gauge to thickness

The same gauge number is not the same thickness in every metal. Steel (including HRPO) uses the Manufacturer's Standard Gauge. Stainless steel uses a slightly different scale. Aluminum uses the Brown & Sharpe (American Wire Gauge) scale.

Nominal thicknesses below are from [The Engineering Toolbox, "Weight vs. Gauges Chart"](https://www.engineeringtoolbox.com/gauge-sheet-d_915.html). Inches are copied from that chart. Millimeters are inches × 25.4, rounded to three decimal places. Actual sheet can vary within mill tolerances, so confirm thickness with a caliper or the material cert when it matters.

| Gauge | Steel (HRPO / standard steel gauge) | Stainless steel | Aluminum |
| :---: | ---: | ---: | ---: |
| 10 | 0.1345 in (3.416 mm) | 0.1406 in (3.571 mm) | 0.1019 in (2.588 mm) |
| 11 | 0.1196 in (3.038 mm) | 0.1250 in (3.175 mm) | 0.0907 in (2.304 mm) |
| 12 | 0.1046 in (2.657 mm) | 0.1094 in (2.779 mm) | 0.0808 in (2.052 mm) |
| 13 | 0.0897 in (2.278 mm) | 0.0937 in (2.380 mm) | 0.0720 in (1.829 mm) |
| 14 | 0.0747 in (1.897 mm) | 0.0781 in (1.984 mm) | 0.0641 in (1.628 mm) |
| 15 | 0.0673 in (1.709 mm) | 0.0703 in (1.786 mm) | 0.0571 in (1.450 mm) |
| 16 | 0.0598 in (1.519 mm) | 0.0625 in (1.588 mm) | 0.0508 in (1.290 mm) |

Overlapping values were cross-checked against [Metal Supermarkets' Sheet Metal Gauge Chart](https://www.metalsupermarkets.com/sheet-metal-gauge-chart/) (that chart does not list gauges 13 or 15). For 13-gauge stainless, Engineering Toolbox lists 0.0937 in; some other charts round 0.09375 in to 0.0938 in.

When ordering or programming, it is safest to call out both the material and the decimal thickness, not just the gauge number.

## Programming and nesting tips

These are common, general practices for laser programming and nesting:

- **Lead-ins and lead-outs.** Start the cut on a lead-in away from a finished edge or sharp corner, so the pierce mark is less likely to show on the part.
- **Common-line cutting.** Where two parts share a straight edge, a single shared cut can save time and gas. Only use it when both parts can tolerate that shared edge, and watch heat buildup on thin material.
- **Micro-joints or tabs.** Leave small tabs so parts stay in the skeleton during cutting and unloading. Too few tabs and parts can tip, move, or fall into the slats; too many and they are hard to break out cleanly.
- **Keep small parts from tipping.** Nest small parts over slats, add tabs, or leave them attached to the skeleton so they do not tip or get blown by the assist gas.
- **Check grain or grain direction.** On some parts, especially those that will be bent later, grain direction matters. Line the nest up with the print or the forming plan.
- **Pierce placement.** Put pierces in scrap or in a lead-in whenever you can, not in the middle of a tight feature.
- **Spacing and heat.** Leave enough gap between parts for the kerf and for heat. Crowding thin stainless or aluminum can cause warping or edge burn.
- **Review the nest before it runs.** Check quantity, material, thickness, grain, lead-ins, tabs, and that no part hangs off the sheet.

## Sources

- [The Engineering Toolbox — Weight vs. Gauges Chart](https://www.engineeringtoolbox.com/gauge-sheet-d_915.html)
- [Metal Supermarkets — Sheet Metal Gauge Chart](https://www.metalsupermarkets.com/sheet-metal-gauge-chart/) (cross-check)
