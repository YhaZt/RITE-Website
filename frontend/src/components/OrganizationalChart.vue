<template>
  <section class="org-chart-section">
    <div class="org-chart-card">
      <h3 class="org-chart-title">Organizational Structure</h3>
      <p class="org-chart-subtitle">RITE Leadership and Administrative Divisions</p>
      
      <!-- Chart Hierarchy Container -->
      <div class="chart-tree">
        <!-- Root node: VP -->
        <div class="tree-level level-root" v-if="topLeader">
          <div class="node-wrapper main-leader">
            <div class="node-card gold-border">
              <div class="node-avatar text-gold">{{ getInitials(topLeader.name) }}</div>
              <div class="node-info">
                <h4>{{ topLeader.name }}</h4>
                <p class="node-role">{{ topLeader.title }}</p>
              </div>
            </div>
          </div>
          <div class="connector-vertical"></div>
        </div>

        <!-- Level 2: Directors & Managers -->
        <div class="tree-level level-leaders" v-if="execLeaders.length > 0">
          <div class="leaders-row">
            <div
              v-for="(exec, idx) in execLeaders"
              :key="exec.id || idx"
              class="node-card"
              :class="idx % 2 === 0 ? 'border-green' : 'border-purple'"
            >
              <div class="node-avatar" :class="idx % 2 === 0 ? 'text-green' : 'text-purple'">
                {{ getInitials(exec.name) }}
              </div>
              <div class="node-info">
                <h4>{{ exec.name }}</h4>
                <p class="node-role">{{ exec.title }}</p>
              </div>
            </div>
          </div>
          <div class="connector-vertical"></div>
        </div>

        <!-- Level 3: Divisions Row -->
        <div class="tree-level level-divisions">
          <div class="divisions-grid">
            <!-- Division 1: Research and Publication -->
            <div class="division-column green-group">
              <h4 class="division-title">Research &amp; Publication</h4>
              <div class="nodes-list">
                <div v-for="item in researchItems" :key="item.id || item.name" class="node-card compact highlight">
                  <div class="node-avatar-sm fill-green">{{ getInitials(item.name) }}</div>
                  <div class="node-info">
                    <h5>{{ item.name }}</h5>
                    <p class="node-role">{{ item.title }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Division 2: Specialized Research Centers -->
            <div class="division-column gold-group">
              <h4 class="division-title">Research Centers</h4>
              <div class="nodes-list">
                <div v-for="item in centerItems" :key="item.id || item.name" class="node-card center-highlight">
                  <div class="node-avatar fill-gold">{{ getInitials(item.name) }}</div>
                  <div class="node-info">
                    <h4>{{ item.name }}</h4>
                    <p class="node-role">{{ item.title }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Division 3: Extension Division -->
            <div class="division-column purple-group">
              <h4 class="division-title">Extension Division</h4>
              <div class="nodes-list">
                <div v-for="item in extensionItems" :key="item.id || item.name" class="node-card compact highlight">
                  <div class="node-avatar-sm fill-purple">{{ getInitials(item.name) }}</div>
                  <div class="node-info">
                    <h5>{{ item.name }}</h5>
                    <p class="node-role">{{ item.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { orgService } from "@/services/orgService";

const defaultMembers = [
  { id: 1, name: "Vice President for Research, Innovation, Technology & Extension", title: "Executive Leadership", division: "Executive Leadership", role_type: "executive_top" },
  { id: 2, name: "Leonel C. Mendoza", title: "OIC Vice President - RDE", division: "Executive Leadership", role_type: "executive" },
  { id: 3, name: "Engr. Randy A. Joco", title: "TBI Manager", division: "Executive Leadership", role_type: "executive" },
  
  { id: 4, name: "University Researcher V", title: "Research Support", division: "Research & Publication" },
  { id: 5, name: "University Researcher IV", title: "Research Support", division: "Research & Publication" },
  { id: 6, name: "Campus Research Coordinator", title: "Research Support", division: "Research & Publication" },
  { id: 7, name: "Leonel C. Mendoza", title: "OIC Vice President - RDE", division: "Research & Publication" },
  { id: 8, name: "Engr. Randy A. Joco", title: "TBI Manager", division: "Research & Publication" },
  { id: 9, name: "University Researcher V", title: "Research Support Specialist", division: "Research & Publication" },
  { id: 10, name: "Technology Transfer and Patent Unit", title: "Research Office Head", division: "Research & Publication" },
  { id: 11, name: "Publication and Printing Unit", title: "Research Office Head", division: "Research & Publication" },

  { id: 12, name: "Highly Specialized Research Centers", title: "Directorate", division: "Research Centers" },

  { id: 13, name: "University Extension Specialist V", title: "Extension Support", division: "Extension Division" },
  { id: 14, name: "University Extension Specialist IV", title: "Extension Support", division: "Extension Division" },
  { id: 15, name: "Campus Extension Coordinator", title: "Extension Support", division: "Extension Division" },
  { id: 16, name: "Extension Unit", title: "Extension Office", division: "Extension Division" },
  { id: 17, name: "Monitoring & Impact Assessment Unit", title: "Extension Office", division: "Extension Division" },
];

const allMembers = ref(defaultMembers);

onMounted(async () => {
  try {
    const apiMembers = await orgService.getAll();
    if (apiMembers && apiMembers.length > 0) {
      allMembers.value = apiMembers;
    }
  } catch (e) {
    console.warn("Using static org members fallback", e);
  }
});

const topLeader = computed(() => {
  return allMembers.value.find(m => m.role_type === 'executive_top' || m.division === 'Executive Leadership' && m.title.includes('Leadership')) || allMembers.value[0];
});

const execLeaders = computed(() => {
  return allMembers.value.filter(m => m.division === 'Executive Leadership' && m.id !== topLeader.value?.id && m.role_type !== 'executive_top');
});

const researchItems = computed(() => {
  return allMembers.value.filter(m => m.division === 'Research & Publication' || m.division === 'Research and Publication Division');
});

const centerItems = computed(() => {
  const items = allMembers.value.filter(m => m.division === 'Research Centers' || m.division === 'Highly Specialized Research Centers');
  return items.length > 0 ? items : [{ id: 'rc', name: 'Highly Specialized Research Centers', title: 'Directorate' }];
});

const extensionItems = computed(() => {
  return allMembers.value.filter(m => m.division === 'Extension Division' || m.division === 'Extension');
});

const getInitials = (name) => {
  if (!name) return "R";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};
</script>

<style scoped>
.org-chart-section {
  width: 100%;
}

.org-chart-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(9, 74, 37, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
}

.org-chart-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 0.4rem 0;
  text-align: center;
}

.org-chart-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 3rem 0;
  text-align: center;
}

.chart-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.tree-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.node-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.node-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  box-sizing: border-box;
}

.node-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  border-color: #094A25;
}

.main-leader .node-card {
  max-width: 550px;
  background: linear-gradient(to right, #ffffff, #fcfdfd);
}

.node-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.node-avatar-sm {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 0.85rem;
  color: #475569;
  flex-shrink: 0;
}

.fill-green {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.fill-purple {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.fill-gold {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.text-gold {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.text-green {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.text-purple {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.gold-border {
  border-left: 5px solid #f59e0b;
}

.border-green {
  border-left: 5px solid #10b981;
}

.border-purple {
  border-left: 5px solid #8b5cf6;
}

.node-info h4 {
  font-size: 1.05rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 0.2rem 0;
}

.node-info h5 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  margin: 0 0 0.15rem 0;
}

.node-role {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.connector-vertical {
  width: 2px;
  height: 2rem;
  background: #cbd5e1;
}

/* Leaders Row */
.leaders-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 900px;
}

.leaders-row .node-card {
  max-width: 320px;
}

/* Divisions Grid */
.divisions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  align-items: stretch;
}

.division-column {
  background: #f8fafc;
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border: 1px solid rgba(0,0,0,0.03);
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.green-group {
  border-top: 4px solid #10b981;
}

.gold-group {
  border-top: 4px solid #f59e0b;
}

.purple-group {
  border-top: 4px solid #8b5cf6;
}

.division-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
  text-align: center;
}

.nodes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.node-card.compact {
  padding: 0.8rem 1rem;
  gap: 0.85rem;
}

.node-card.highlight {
  background: #ffffff;
  border-color: rgba(9, 74, 37, 0.08);
}

.node-card.center-highlight {
  background: #ffffff;
  border-left: 5px solid #f59e0b;
  padding: 1.5rem;
  max-width: 100%;
}

@media (max-width: 992px) {
  .divisions-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .leaders-row {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .leaders-row .node-card {
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .org-chart-card {
    padding: 1.5rem;
  }
  .node-card {
    padding: 1rem;
    gap: 0.75rem;
  }
  .node-avatar {
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
}
</style>
