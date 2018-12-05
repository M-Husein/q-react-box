import React from 'react';
import PropTypes from 'prop-types';

export default class Qbox extends React.Component{


	// componentDidUpdate(){
	// 	console.log('componentDidUpdate in Qbox');
	// }

// FOR Scroll to bottom box
	onScrollY(e){
		let et = e.target,
				p = et.parentNode.children[0],
				ph = p.scrollHeight;
		p.scrollTo(0,ph);
		// if(p.scrollTop >= ps){
			// console.log('p.scrollTop: '+p.scrollTop);
			// console.log('p.scrollHeight: '+ph);
		// }
		// setTimeout(() => et.classList.add('d-none'),150);
		// window.requestAnimationFrame(function(){
		// 	console.log('p.scrollTop: '+p.scrollTop);
		// });
	}

	onScrollBox(e){
		const {scrollTop,scrollHeight,clientHeight} = e.target,
					sh = scrollHeight - clientHeight,
					btn = e.target.parentNode.childNodes[1];
		//window.requestAnimationFrame(() =>
			if(scrollTop >= sh){
				btn.classList.add('scale-opacity-0');
			}else{
				btn.classList.remove('scale-opacity-0');
			}
		//);
		// console.log(scrollTop);
	}

	render(){


		return (
			<div className='qbox-wrap'>
				<div className='boxes'>
				{this.props.boxItems.map((box,i) => (
					<div
						key={i} 
						id={box.id} 
						className={`card qbox${box.boxMin ? ' boxMin' : ''}${box.boxExp ? ' box-expand' : ''}`}
						tabIndex='0'
						role='application'
					>
						<div className='box-el'>
							<div className='card-header'>
								<small><a href={box.id}>{box.boxTitle}</a></small>
								<div className='btn-group btn-group-sm'>
									{this.props.boxMinMax ? (
										<div 
											onClick={this.props.minMaxBox} 
											className='btn btn-light mdi mdi-window-minimize'
											role='button' 
											title={box.boxMin ? 'Maximize' : 'Minimize'}
											data-minmax={i}
										>
										</div>
									) : null}

									{this.props.boxExpand ? (
										<div 
											onClick={this.props.expandBox} 
											className='btn btn-light mdi mdi-fullscreen'
											role='button' 
											title={box.boxExp ? 'Exit Fullscreen' : 'Fullscreen'} 
											data-exp={i}
										>
										</div>
									) : null}

									<div onClick={this.props.closeBox} className='btn btn-light mdi mdi-close' role='button' title='Close' data-x={i}></div>
								</div>
							</div>

							<div className='box-body'>
								<div className='box-content q-scroll' onScroll={(e)=>this.onScrollBox(e)}>
									{this.props.children}
								</div>
								<div 
									className='btn btn-sm btn-primary mdi mdi-arrow-down btnGoToDownBox' 
									role='button' 
									title='Go to bottom' 
									onClick={(e)=>this.onScrollY(e)}
								/>
							</div>
							{this.props.boxFoot}
						</div>
					</div>
				))}

				{this.props.boxMax ? (
					<div className='dropdown btnMaxBox'>
						<button className='btn btn-sm btn-info mdi mdi-message-text' type='button' title='More'></button>
						<div className='dropdown-menu q-scroll'>
							{this.props.boxItemsMax.map((box,i) => (
								<div key={i} id={box.id} className='d-flex' tabIndex='0'>
									<a 
										className="dropdown-item" 
										href={box.id}
										title='Click to open'
										data-id={i}
										onClick={this.props.maxToView}
									>
										{box.boxTitle}
									</a>
									<button onClick={this.props.closeBoxMax} className='btn btn-sm mdi mdi-close xico' type='button' title='Close' data-x={i}></button>
								</div>
							))}
						</div>
					</div>
				) : null}

				</div>
			</div>
		);
	}
}

Qbox.propTypes = {
	boxItems:PropTypes.array,
	boxItemsMax:PropTypes.array,
	boxMax:PropTypes.bool,
	closeBox:PropTypes.func,
	closeBoxMax:PropTypes.func,
	boxMinMax:PropTypes.bool,
	minMaxBox:PropTypes.func,

	boxExpand:PropTypes.bool,
	expandBox:PropTypes.func,

	boxFoot:PropTypes.element,
}


