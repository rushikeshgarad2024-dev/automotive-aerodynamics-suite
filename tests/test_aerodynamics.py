import unittest

class TestAerodynamics(unittest.TestCase):
    def test_drag_force_calculation(self):
        rho = 1.225 # kg/m^3
        v = 30.0    # m/s
        A = 2.2     # m^2 frontal area
        Cd = 0.28   # drag coefficient
        F_drag = 0.5 * rho * (v**2) * Cd * A
        self.assertAlmostEqual(F_drag, 339.69, places=1)

if __name__ == '__main__':
    unittest.main()
