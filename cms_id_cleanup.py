import pandas as pd
import numpy as np

#fl_processed_sheet = 'https://docs.google.com/spreadsheets/d/1UQRhavmfDFG77aQs1IWnudH8Oqx5DPWeUxXofOisXhc/gviz/tq?tqx=out:csv&sheet=Sheet1'
fl_processed = '~/downloads/data (1).csv'
fl_processed_df = pd.read_csv(fl_processed)

cms_ltc_sheet = 'https://docs.google.com/spreadsheets/d/1d1PKh90_bkFhwgz3lSv3vKdqn4L8g0PM5qGMe75zBfM/gviz/tq?tqx=out:csv&sheet=test-facility-list-full'
cms_df = pd.read_csv(cms_ltc_sheet)

#renaming cms columns to those in the ltc sheet
cms_df.columns.to_list()
cms_df_trimmed = cms_df[['State ','City','Facility Name','County','CMS Facility ID','CTP Facility Categorization','State Facility Type']]
cms_df_trimmed = cms_df_trimmed.rename(columns={'State ': 'State', 'Facility Name': 'Facility', 'CMS Facility ID': 'CMS_ID','CTP Facility Categorization': 'CTP_Facility_Type', 'State Facility Type': 'State_Facility_Type'})

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
        record['CTP_Facility_Type'] = None
        record['Regulate'] = None
    return record

#make nan any CMS_IDs tied to facilities that are not nursing homes
def not_nh(record):
    if ((record['State_Facility_Type'] != 'NH') and ~(np.isnan(record['CMS_ID']))):
        record['CMS_ID'] = None
    return record

# process
# merge with cms
# take new CMS id or old if no new
# run state_to_ctp
# run not_nh
# clean, remove extraneous columns (new CMS)
