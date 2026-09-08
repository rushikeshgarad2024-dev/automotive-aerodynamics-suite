"""
NACA 4-Digit Airfoil Geometry & Drag Force Calculator
Author: Rushikesh Garad
"""
import numpy as np

def generate_naca_4digit(digits="2412", num_points=100):
    m = int(digits[0]) / 100.0   # Max camber
    p = int(digits[1]) / 10.0    # Location of max camber
    t = int(digits[2:]) / 100.0  # Max thickness

    x = np.linspace(0, 1, num_points)
    yt = 5 * t * (0.2969 * np.sqrt(x) - 0.1260 * x - 0.3516 * x**2 + 0.2843 * x**3 - 0.1015 * x**4)

    yc = np.zeros_like(x)
    if p > 0:
        yc[x < p] = (m / p**2) * (2*p*x[x < p] - x[x < p]**2)
        yc[x >= p] = (m / (1-p)**2) * ((1 - 2*p) + 2*p*x[x >= p] - x[x >= p]**2)

    return x, yc + yt, yc - yt

def calculate_vehicle_aerodynamics(speed_kmh=120, cd=0.28, frontal_area_m2=2.2, air_density=1.225):
    v_ms = speed_kmh / 3.6
    drag_force = 0.5 * air_density * (v_ms**2) * cd * frontal_area_m2 # N
    drag_power_kw = (drag_force * v_ms) / 1000 # kW
    return drag_force, drag_power_kw

if __name__ == "__main__":
    df, dp = calculate_vehicle_aerodynamics(120, 0.28, 2.2)
    print(f"Vehicle at 120 km/h -> Aerodynamic Drag: {df:.1f} N | Power Required: {dp:.2f} kW")
