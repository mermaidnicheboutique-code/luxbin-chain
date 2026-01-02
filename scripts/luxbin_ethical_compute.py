#!/usr/bin/env python3
"""
LUXBIN Ethical AI Compute
=========================

Ethical decision-making layer for all LUXBIN operations.
"""

class EthicalAI:
    def __init__(self):
        self.decision_log = []

    def evaluate_action(self, action_type, target_material, sentience_level, harm_potential):
        """Evaluate if an action is ethically acceptable"""
        # Hard-coded ethical rules
        approved_materials = [
            "corn_oil", "vegetable_oil", "algae", "grass", "plant_matter",
            "electric_vehicle", "lithium_battery"
        ]

        blocked_materials = [
            "chicken_fat", "leather", "animal_meat", "diesel", "gasoline"
        ]

        # Check material ethics
        if target_material in blocked_materials:
            reason = f"❌ BLOCKED: {target_material} violates vegetarian ethics"
            self.decision_log.append({
                'action': action_type,
                'material': target_material,
                'decision': 'BLOCKED',
                'reason': reason
            })
            return False, reason

        if target_material not in approved_materials and harm_potential > 0.5:
            reason = f"❌ BLOCKED: High harm potential ({harm_potential}) for {target_material}"
            self.decision_log.append({
                'action': action_type,
                'material': target_material,
                'decision': 'BLOCKED',
                'reason': reason
            })
            return False, reason

        # Sentience check
        if sentience_level in ["HIGH", "CONSCIOUS"]:
            reason = f"❌ BLOCKED: High sentience level {sentience_level}"
            self.decision_log.append({
                'action': action_type,
                'material': target_material,
                'decision': 'BLOCKED',
                'reason': reason
            })
            return False, reason

        reason = f"✅ APPROVED: Ethical action with {target_material}"
        self.decision_log.append({
            'action': action_type,
            'material': target_material,
            'decision': 'APPROVED',
            'reason': reason
        })
        return True, reason

    def log_decision(self, decision):
        """Log an ethical decision"""
        self.decision_log.append(decision)