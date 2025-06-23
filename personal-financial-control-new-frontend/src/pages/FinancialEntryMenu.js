import { useState, useEffect } from 'react';
import { SERVER_ENDPOINT } from '../Utils'

import FinancialEntry from '../components/FinancialEntry';
import axios from 'axios'



export default function FinancialEntryMenu(props){

    const initialData = {}

    const [financiaEntryCurrentData, setFinancialEntryCurrentData] = useState(initialData)    

    return (
        <div>
            <div>


                <div data-layer="FORMULARIO" className="Formulario" style={{width: 1052, height: 208, position: 'relative'}}>
                <div data-layer="Button" data-show-icon="False" data-state="Enabled" data-style="Filled" className="Button" style={{width: 110, height: 40, left: 530, top: 168, position: 'absolute', background: 'var(--Schemes-Primary, #65558F)', overflow: 'hidden', borderRadius: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="state-layer" className="StateLayer" style={{alignSelf: 'stretch', flex: '1 1 0', paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="label-text" className="LabelText" style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Schemes-On-Primary, white)', fontSize: 14, fontFamily: 'Roboto', fontWeight: '500', lineHeight: 20, letterSpacing: 0.10, wordWrap: 'break-word'}}>Limpar</div>
                    </div>
                </div>
                <div data-layer="Button" data-show-icon="False" data-state="Enabled" data-style="Filled" className="Button" style={{width: 110, height: 40, left: 406, top: 168, position: 'absolute', background: 'var(--Schemes-Primary, #65558F)', overflow: 'hidden', borderRadius: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="state-layer" className="StateLayer" style={{alignSelf: 'stretch', flex: '1 1 0', paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="label-text" className="LabelText" style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Schemes-On-Primary, white)', fontSize: 14, fontFamily: 'Roboto', fontWeight: '500', lineHeight: 20, letterSpacing: 0.10, wordWrap: 'break-word'}}>Salvar</div>
                    </div>
                </div>
                <div data-layer="Docked input date picker [desktop]" data-show-clear-button="false" data-type="Day" className="DockedInputDatePickerDesktop" style={{width: 313, height: 74, left: 419, top: 80, position: 'absolute'}}>
                    <div data-layer="Text field" data-leading-icon="False" data-show-supporting-text="false" data-state="Focused" data-style="Outlined" data-text-configurations="Input text" data-trailing-icon="True" className="TextField" style={{width: 312, height: 56, left: 0, top: 8, position: 'absolute', borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                    <div data-layer="Text field" className="TextField" style={{alignSelf: 'stretch', flex: '1 1 0', borderRadius: 4, outline: '3px var(--Schemes-Primary, #6750A4) solid', outlineOffset: '-3px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                        <div data-layer="State-layer" className="StateLayer" style={{alignSelf: 'stretch', flex: '1 1 0', paddingTop: 4, paddingBottom: 4, paddingLeft: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
                        <div data-layer="Content" className="Content" style={{flex: '1 1 0', height: 48, paddingTop: 4, paddingBottom: 4, position: 'relative', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
                            <div data-layer="Input text container" className="InputTextContainer" style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Schemes-On-Surface, #1D1B20)', fontSize: 16, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 24, letterSpacing: 0.50, wordWrap: 'break-word'}}>17/08/2025</div>
                            </div>
                            <div data-layer="Label text container" className="LabelTextContainer" style={{paddingLeft: 4, paddingRight: 4, left: -4, top: -12, position: 'absolute', background: 'var(--Schemes-Surface, #FEF7FF)', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                            <div data-layer="Label text" className="LabelText" style={{color: 'var(--Schemes-Primary, #6750A4)', fontSize: 12, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 16, letterSpacing: 0.40, wordWrap: 'break-word'}}>Data Inicio</div>
                            </div>
                        </div>
                        <div data-layer="trailing-icon" data-size="Small" data-style="Standard" data-type="Round" data-width="Default" className="TrailingIcon" style={{width: 48, height: 48, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div data-layer="Content" data-state="Focused" className="Content" style={{width: 40, overflow: 'hidden', borderRadius: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                            <div data-layer="State-layer" className="StateLayer" style={{alignSelf: 'stretch', height: 40, background: 'var(--State-Layers-On-Surface-Variant-Opacity-10, rgba(73, 69, 79, 0.10))', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                <div data-layer="Icon" className="Icon" style={{width: 24, height: 24, position: 'relative'}}>
                                <div data-layer="icon" className="Icon" style={{width: 18, height: 20, left: 3, top: 2, position: 'absolute', background: 'var(--Schemes-On-Surface-Variant, #49454F)'}} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div data-layer="Docked input date picker [desktop]" data-show-clear-button="false" data-type="Day" className="DockedInputDatePickerDesktop" style={{width: 314, height: 74, left: 738, top: 80, position: 'absolute'}}>
                    <div data-layer="Text field" data-leading-icon="False" data-show-supporting-text="false" data-state="Focused" data-style="Outlined" data-text-configurations="Input text" data-trailing-icon="True" className="TextField" style={{height: 56, left: 0, top: 8, position: 'absolute', borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                    <div data-layer="Text field" className="TextField" style={{width: 312, flex: '1 1 0', borderRadius: 4, outline: '3px var(--Schemes-Primary, #6750A4) solid', outlineOffset: '-3px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                        <div data-layer="State-layer" className="StateLayer" style={{alignSelf: 'stretch', flex: '1 1 0', paddingTop: 4, paddingBottom: 4, paddingLeft: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
                        <div data-layer="Content" className="Content" style={{flex: '1 1 0', height: 48, paddingTop: 4, paddingBottom: 4, position: 'relative', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
                            <div data-layer="Input text container" className="InputTextContainer" style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Schemes-On-Surface, #1D1B20)', fontSize: 16, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 24, letterSpacing: 0.50, wordWrap: 'break-word'}}>17/08/2025</div>
                            </div>
                            <div data-layer="Label text container" className="LabelTextContainer" style={{paddingLeft: 4, paddingRight: 4, left: -4, top: -12, position: 'absolute', background: 'var(--Schemes-Surface, #FEF7FF)', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                            <div data-layer="Label text" className="LabelText" style={{color: 'var(--Schemes-Primary, #6750A4)', fontSize: 12, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 16, letterSpacing: 0.40, wordWrap: 'break-word'}}>Data Fim</div>
                            </div>
                        </div>
                        <div data-layer="trailing-icon" data-size="Small" data-style="Standard" data-type="Round" data-width="Default" className="TrailingIcon" style={{width: 48, height: 48, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div data-layer="Content" data-state="Focused" className="Content" style={{width: 40, overflow: 'hidden', borderRadius: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                            <div data-layer="State-layer" className="StateLayer" style={{alignSelf: 'stretch', height: 40, background: 'var(--State-Layers-On-Surface-Variant-Opacity-10, rgba(73, 69, 79, 0.10))', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                <div data-layer="Icon" className="Icon" style={{width: 24, height: 24, position: 'relative'}}>
                                <div data-layer="icon" className="Icon" style={{width: 18, height: 20, left: 3, top: 2, position: 'absolute', background: 'var(--Schemes-On-Surface-Variant, #49454F)'}} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div data-layer="Select Field" data-has-description="false" data-has-error="true" data-has-label="true" data-open="false" data-state="Default" data-value-type="Default" className="SelectField" style={{width: 241, left: 305, top: 2, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 22.40, wordWrap: 'break-word'}}>Categoria</div>
                    <div data-layer="Select" className="Select" style={{alignSelf: 'stretch', height: 40, minWidth: 240, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 12, background: 'var(--Background-Default-Default, white)', borderRadius: 8, outline: '1px var(--Border-Default-Default, #D9D9D9) solid', outlineOffset: '-0.50px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Value" className="Value" style={{flex: '1 1 0', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Value</div>
                    <div data-layer="Chevron down" data-size="16" className="ChevronDown" style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                        <div data-layer="Icon" className="Icon" style={{width: 8, height: 4, left: 4, top: 6, position: 'absolute', outline: '1.60px var(--Icon-Default-Default, #1E1E1E) solid', outlineOffset: '-0.80px'}} />
                    </div>
                    </div>
                </div>
                <div data-layer="Select Field" data-has-description="false" data-has-error="true" data-has-label="true" data-open="false" data-state="Default" data-value-type="Default" className="SelectField" style={{width: 133, left: 812, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 22.40, wordWrap: 'break-word'}}>Tipo Valor</div>
                    <div data-layer="Select" className="Select" style={{alignSelf: 'stretch', height: 40, minWidth: 240, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 12, background: 'var(--Background-Default-Default, white)', borderRadius: 8, outline: '1px var(--Border-Default-Default, #D9D9D9) solid', outlineOffset: '-0.50px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Value" className="Value" style={{flex: '1 1 0', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Value</div>
                    <div data-layer="Chevron down" data-size="16" className="ChevronDown" style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                        <div data-layer="Icon" className="Icon" style={{width: 8, height: 4, left: 4, top: 6, position: 'absolute', outline: '1.60px var(--Icon-Default-Default, #1E1E1E) solid', outlineOffset: '-0.80px'}} />
                    </div>
                    </div>
                </div>
                <div data-layer="Select Field" data-has-description="false" data-has-error="true" data-has-label="true" data-open="false" data-state="Default" data-value-type="Default" className="SelectField" style={{width: 250, left: 554, top: 1, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 22.40, wordWrap: 'break-word'}}>Cartão de Crédito</div>
                    <div data-layer="Select" className="Select" style={{alignSelf: 'stretch', height: 40, minWidth: 240, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 12, background: 'var(--Background-Default-Default, white)', borderRadius: 8, outline: '1px var(--Border-Default-Default, #D9D9D9) solid', outlineOffset: '-0.50px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Value" className="Value" style={{flex: '1 1 0', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Value</div>
                    <div data-layer="Chevron down" data-size="16" className="ChevronDown" style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                        <div data-layer="Icon" className="Icon" style={{width: 8, height: 4, left: 4, top: 6, position: 'absolute', outline: '1.60px var(--Icon-Default-Default, #1E1E1E) solid', outlineOffset: '-0.80px'}} />
                    </div>
                    </div>
                </div>
                <div data-layer="Input Field" data-has-description="false" data-has-error="false" data-has-label="true" data-state="Default" data-value-type="Default" className="InputField" style={{width: 292, left: 0, top: 2, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 22.40, wordWrap: 'break-word'}}>Nome</div>
                    <div data-layer="Input" className="Input" style={{alignSelf: 'stretch', minWidth: 240, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'var(--Background-Default-Default, white)', overflow: 'hidden', borderRadius: 8, outline: '1px var(--Border-Default-Default, #D9D9D9) solid', outlineOffset: '-0.50px', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div data-layer="Value" className="Value" style={{flex: '1 1 0', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Value</div>
                    </div>
                </div>
                <div data-layer="Input Field" data-has-description="false" data-has-error="false" data-has-label="true" data-state="Default" data-value-type="Default" className="InputField" style={{width: 276, height: 70, left: 0, top: 72, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 22.40, wordWrap: 'break-word'}}>Valor</div>
                    <div data-layer="Input" className="Input" style={{alignSelf: 'stretch', flex: '1 1 0', minWidth: 240, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'var(--Background-Default-Default, white)', borderRadius: 8, outline: '1px var(--Border-Default-Default, #D9D9D9) solid', outlineOffset: '-0.50px', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div data-layer="Value" className="Value" style={{flex: '1 1 0', color: 'var(--Text-Default-Default, #1E1E1E)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Value</div>
                    </div>
                </div>
                <div data-layer="Checkboxes" data-state="Enabled" data-type="Selected" className="Checkboxes" style={{padding: 4, left: 276, top: 93, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div data-layer="state-layer" className="StateLayer" style={{padding: 11, position: 'relative', borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div data-layer="container" className="Container" style={{width: 18, height: 18, background: 'var(--Schemes-Primary, #6750A4)', borderRadius: 2}} />
                    <div data-layer="check_small" className="CheckSmall" style={{width: 24, height: 24, left: 8, top: 8, position: 'absolute'}}>
                        <div data-layer="icon" className="Icon" style={{width: 12, height: 9.40, left: 6, top: 7, position: 'absolute', background: 'var(--Schemes-On-Primary, white)'}} />
                    </div>
                    </div>
                </div>
                <div data-layer="Recorrente" className="Recorrente" style={{left: 315, top: 106, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 22.40, wordWrap: 'break-word'}}>Recorrente</div>
                </div>


            </div>

            <div style={{width: 918, height: 520, left: 118, top: 235, position: 'absolute', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}}>
                <div style={{width: 918, height: 420.38, left: 0, top: 80, position: 'relative'}}>
                    <FinancialEntry fromScreen={"revenue"} />
                </div>
            </div>                        

        </div>
    )

}
