<template>
    <div style="text-align: center;">
    <DataTable :value="econtable" class="p-datatable-lg" showGridlines responsiveLayout="scroll">
        <ColumnGroup type="header">
            <Row>
                <Column header="Region" :rowspan="2" :sortable="true" field="region_id" />
                <Column header="System" :rowspan="2" :sortable="true" field="system" />
                <Column header="Econ" :rowspan="2" :sortable="true" field="economy_level" />
                <Column header="Control" :rowspan="2" :sortable="true" field="control" />
                <Column header="Food" :colspan="2" />
                <Column header="Meds" :colspan="2" />
                <Column header="Hydr" :colspan="2" />
                <Column header="Elec" :colspan="2" />
                <Column header="Solr" :colspan="2" />
                <Column header="Metl" :colspan="2" />
                <Column header="Diam" :colspan="2" />
                <Column header="Amat" :colspan="2" />
                <Column header="Fusn" :colspan="2" />
                <Column header="Mach" :colspan="2" />
                <Column header="Text" :colspan="2" />
                <Column header="Plat" :colspan="2" />
                <Column header="Biol" :colspan="2" />
                <Column header="Oxyg" :colspan="2" />
                <Column header="Gold" :colspan="2" />
                <Column header="Silv" :colspan="2" />
                <Column header="Watr" :colspan="2" />
                <Column header="Armr" :colspan="2" />
            </Row>
            <Row>
                <Column header="$" :sortable="true" field="food_price" />
                <Column header="%" :sortable="true" field="food_percent"/>
                <Column header="$" :sortable="true" field="medical_supplies_price"/>
                <Column header="%" :sortable="true" field="medical_supplies_percent"/>
                <Column header="$" :sortable="true" field="hydrogen_price"/>
                <Column header="%" :sortable="true" field="hydrogen_percent"/>
                <Column header="$" :sortable="true" field="electronics_price"/>
                <Column header="%" :sortable="true" field="electronics_percent"/>
                <Column header="$" :sortable="true" field="solar_price"/>
                <Column header="%" :sortable="true" field="solar_percent"/>
                <Column header="$" :sortable="true" field="metal_price"/>                
                <Column header="%" :sortable="true" field="metal_percent"/>
                <Column header="$" :sortable="true" field="diamond_price"/>
                <Column header="%" :sortable="true" field="diamond_percent"/>
                <Column header="$" :sortable="true" field="antimatter_price"/>
                <Column header="%" :sortable="true" field="antimatter_percent"/>
                <Column header="$" :sortable="true" field="fusion_price"/>
                <Column header="%" :sortable="true" field="fusion_percent"/>
                <Column header="$" :sortable="true" field="machinery_price"/>
                <Column header="%" :sortable="true" field="machinery_percent"/>
                <Column header="$" :sortable="true" field="textiles_price"/>
                <Column header="%" :sortable="true" field="textiles_percent"/>
                <Column header="$" :sortable="true" field="platinum_price"/>
                <Column header="%" :sortable="true" field="platinum_percent"/>
                <Column header="$" :sortable="true" field="biological_price"/>
                <Column header="%" :sortable="true" field="biological_percent"/>
                <Column header="$" :sortable="true" field="oxygen_price"/>
                <Column header="%" :sortable="true" field="oxygen_percent"/>
                <Column header="$" :sortable="true" field="gold_price"/>
                <Column header="%" :sortable="true" field="gold_percent"/>
                <Column header="$" :sortable="true" field="silver_price"/>
                <Column header="%" :sortable="true" field="silver_percent"/>
                <Column header="$" :sortable="true" field="water_price"/>
                <Column header="%" :sortable="true" field="water_percent"/>
                <Column header="$" :sortable="true" field="armor_price"/>
                <Column header="%" :sortable="true" field="armor_percent"/>
            </Row>
        </ColumnGroup>
            <Column field="region_id" />
            <Column field="system" />
            <Column field="economy_level" />
            <Column field="control" />
            <Column field="food_price" />
            <Column field="food_percent" />
            <Column field="medical_supplies_price" />
            <Column field="medical_supplies_percent" />
            <Column field="hydrogen_price" />
            <Column field="hydrogen_percent" />
            <Column field="electronics_price" />
            <Column field="electronics_percent" />
            <Column field="solar_price" />
            <Column field="solar_percent" />
            <Column field="metal_price" />                
            <Column field="metal_percent" />
            <Column field="diamond_price" />
            <Column field="diamond_percent" />
            <Column field="antimatter_price" />
            <Column field="antimatter_percent" />
            <Column field="fusion_price" />
            <Column field="fusion_percent" />
            <Column field="machinery_price" />
            <Column field="machinery_percent" />
            <Column field="textiles_price" />
            <Column field="textiles_percent" />
            <Column field="platinum_price" />
            <Column field="platinum_percent" />
            <Column field="biological_price" />
            <Column field="biological_percent" />
            <Column field="oxygen_price" />
            <Column field="oxygen_percent" />
            <Column field="gold_price" />
            <Column field="gold_percent" />
            <Column field="silver_price" />
            <Column field="silver_percent" />
            <Column field="water_price" />
            <Column field="water_percent" />
            <Column field="armor_price" />
            <Column field="armor_percent" />
    </DataTable>
    </div>
</template>

<script>

export default {
 props: [
      'econData'
  ],   
  data() {
    return {
      econtable: null,
    }
  },
  watch: {
    'econData': {
      handler(newData, oldData) {
        console.log(newData);
        this.econtable=newData;
      },
    },
  },
  methods: {
    parseEconData(econData) {      
      console.log("Dork");
      console.log(econData);      
    }
  },
}

</script>

<style>
[class^="p-"] {
    justify-content: center;    
    
}
 tbody, th, td, tr  {
    text-align:center;
    vertical-align: middle;
    padding-left: 3px;
    padding-right: 3px;
 }

</style>