import pandas as pd
import numpy as np

# Clean up CTP Facility Types and federal/state regulated. This is optimized for FL - other states have different labels
def state_to_ctp(record):
    state = record['State_Facility_Type']
    if(state == 'ALF' or state == 'Assisted Living'):
        record['CTP_Facility_Type'] = 'Assisted Living'
        record['Regulate'] = 'State'
    elif(state == 'NH'):
        record['CTP_Facility_Type'] = 'Nursing Home'
        record['Regulate'] = 'Federal'
    elif(state == 'ICF'):
        record['CTP_Facility_Type'] = 'Other'
        record['Regulate'] = 'State'
    else:
        record['CTP_Facility_Type'] = np.nan
        record['Regulate'] = np.nan
    return record

# Make null any CMS IDs tied to facilities that are not nursing homes. This is optimized for FL - other states have different labels
def not_nh(record):
    if ((record['State_Facility_Type'] != 'NH') and (not pd.isnull(record['CMS_ID']))):
        import pdb; pdb.set_trace()
        record['CMS_ID'] = np.nan
    return record
    
def main():
    fl_processed_sheet = 'https://docs.google.com/spreadsheets/d/1UQRhavmfDFG77aQs1IWnudH8Oqx5DPWeUxXofOisXhc/gviz/tq?tqx=out:csv&sheet=Sheet1'
    fl_processed_df = pd.read_csv(fl_processed)
    processed_with_type = fl_processed_df.apply(state_to_ctp, axis = 1)
    processed_with_type = fl_processed_df.apply(not_nh, axis = 1)
    processed_with_type.to_csv('fl_facilities.csv')

if __name__ == "__main__":
    main()
